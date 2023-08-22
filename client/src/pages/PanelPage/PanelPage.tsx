import { Link, useParams } from "react-router-dom";
import dummySchemas from "../../assets/data/schemas";
import MaterialIcon from "../../common/MaterialIcon";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import EntryField from "./components/EntryField";
import ListView from "./components/ListView";
import { Artifact, Collection } from "../../interfaces/Data";
import api from "../../helpers/api";

export default function PanelPage() {
  const { id } = useParams();
  const [artifact, setArtifact] = useState<
    Artifact & { collections: Collection[] }
  >();

  const [collection, setCollection] = useState<Collection | null>();
  const [selectedCollection, setSelectedCollection] = useState<number>();
  const [newObj, setNewObj] = useState<object>({});
  const [mode, setMode] = useState<"new" | "list">("new");

  async function loadData() {
    const artifact = await api.getArtifact(Number(id));
    setArtifact(artifact);
  }

  useEffect(() => {
    loadData();
  }, []);

  async function loadSelectedCollection() {
    setCollection(null);
    if (selectedCollection) {
      const c = await api.getCollection(selectedCollection);
      setCollection(c);
    }
  }

  useEffect(() => {
    loadSelectedCollection();
  }, [selectedCollection]);

  return (
    <div className="h-[85vh] flex">
      <div className="basis-1/6 flex flex-col h-full justify-between">
        <p className="text-center bg-background py-2 border-2 border-l-transparent border-primary border-opacity-30">
          Collections
        </p>
        <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-primary gap-y-2 flex flex-col">
          {artifact &&
            artifact.collections.map((collection) => (
              <button
                className={twMerge(
                  "bg-foreground bg-opacity-5 text-center py-4 duration-300 hover:bg-opacity-20",
                  selectedCollection === collection.id &&
                    "bg-primary bg-opacity-30 text-secondary"
                )}
                onClick={() => setSelectedCollection(collection.id)}
                key={collection.id}
              >
                {collection.name}
              </button>
            ))}
        </div>
        <Link
          to={`/artifact/${id}/settings`}
          className="gap-x-2 justify-center btn-3 py-5"
        >
          <MaterialIcon codepoint="e8b8" /> Settings
        </Link>
      </div>
      <div className="flex-1 flex h-full overflow-y-scroll scrollbar-thin scrollbar-primary relative flex-col">
        {selectedCollection && (
          <div className="flex justify-between p-10">
            <div className="flex bg-foreground bg-opacity-10 rounded-md p-2 gap-x-2">
              <button
                className={twMerge(
                  "bg-background px-4 py-1",
                  mode === "new" && "bg-primary"
                )}
                onClick={() => setMode("new")}
              >
                New
              </button>
              <button
                className={twMerge(
                  "bg-background px-4 py-1",
                  mode === "list" && "bg-primary"
                )}
                onClick={() => setMode("list")}
              >
                List
              </button>
            </div>

            {true && (
              <Link
                to={`/collection/${selectedCollection}/schema`}
                className="px-5 py-2 btn-3 gap-x-2 rounded"
              >
                <MaterialIcon codepoint="ead3" />
                Schema
              </Link>
            )}
          </div>
        )}

        {selectedCollection && collection && (
          <div className="flex flex-col">
            {mode === "new" && (
              <div className="pr-10">
                <EntryField
                  schema={collection.schema}
                  data={newObj}
                  setData={setNewObj}
                  nest={[]}
                  disableLine
                />
              </div>
            )}

            {mode === "list" && (
              <div className="px-10">
                <ListView
                  schema={collection.schema}
                  collectionId={selectedCollection}
                />
              </div>
            )}

            <button className="btn-3 px-8 py-2 mt-8 self-center rounded">
              Add Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
