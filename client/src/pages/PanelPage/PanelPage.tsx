import { Link, useParams } from "react-router-dom";
import dummySchemas from "../../assets/data/schemas";
import MaterialIcon from "../../common/MaterialIcon";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import EntryField from "./components/EntryField";
import ListView from "./components/ListView";
import { Artifact, Collection } from "../../interfaces/Data";
import api from "../../helpers/api";
import { deepCopy } from "../../helpers/utils";
import useQuery from "../../hooks/useQuery";
import useModal from "../../hooks/useModal";
import InterfaceModal from "./components/InterfaceModal";

export default function PanelPage() {
  const { id } = useParams();
  const [artifact, setArtifact] = useState<
    Artifact & { collections: Collection[] }
  >();

  const [collection, setCollection] = useState<Collection | null>();
  const [selectedCollection, setSelectedCollection] = useState<number | null>();
  const [newObj, setNewObj] = useState<object>({});
  const [mode, setMode] = useState<"new" | "list">("new");
  const [erronous, setErronous] = useState(true);

  const query = useQuery();

  async function loadData() {
    const artifact = await api.getArtifact(Number(id));
    setArtifact(artifact);
  }

  useEffect(() => {
    loadData();
    const predecidedCollection = Number(query.get("selectedCollection"));
    if (predecidedCollection) setSelectedCollection(predecidedCollection);
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

  async function createNewEntry() {
    if (selectedCollection) {
      const entryData = deepCopy(newObj);
      setNewObj({});
      const r = selectedCollection;
      setSelectedCollection(null);
      setTimeout(() => {
        setSelectedCollection(r);
      }, 10);
      await api.newEntry(selectedCollection, entryData);
    }
  }

  const modal = useModal();

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

            {collection && (
              <div className="flex gap-x-10">
                <button
                  className="px-5 py-2 btn-3 gap-x-2 rounded"
                  onClick={() =>
                    modal.show(
                      <InterfaceModal
                        name={collection.name}
                        schema={collection.schema}
                      />
                    )
                  }
                >
                  <MaterialIcon codepoint="f1c6" /> Interface
                </button>

                <Link
                  to={`/collection/${selectedCollection}/schema`}
                  className="px-5 py-2 btn-3 gap-x-2 rounded"
                >
                  <MaterialIcon codepoint="ead3" />
                  Schema
                </Link>
              </div>
            )}
          </div>
        )}

        {selectedCollection && collection && (
          <div className="flex flex-col">
            {mode === "new" && (
              <div className="pr-10 flex flex-col">
                <EntryField
                  schema={collection.schema}
                  data={newObj}
                  setData={setNewObj}
                  nest={[]}
                  setErronous={setErronous}
                  disableLine
                />
                {collection.schema.length > 0 && (
                  <div className="relative self-center mt-8">
                    <button
                      className="btn-3 px-9 py-3 rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                      disabled={erronous}
                      onClick={createNewEntry}
                    >
                      Add Entry
                    </button>
                    {erronous && (
                      <div className="absolute z-1 top-0 left-0 w-full h-full group cursor-not-allowed">
                        <ErrorTooltip className="hidden group-hover:block" />
                      </div>
                    )}
                  </div>
                )}
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
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorTooltip(props: { className?: string }) {
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const ref = useRef() as React.MutableRefObject<HTMLParagraphElement>;

  let swapX = false;
  let swapY = false;
  function attachToMouse(event: MouseEvent) {
    const rect = ref.current.getBoundingClientRect();
    swapX = window.innerWidth < rect.right + (swapX ? rect.width : 0);
    swapY = window.innerHeight < rect.bottom + (swapY ? rect.height : 0);

    setPosition({
      top: event.y - (swapY ? rect.height : 0),
      left: event.x - (swapX ? rect.width : 0),
    });
  }

  useEffect(() => {
    window.addEventListener("mousemove", attachToMouse);
    attachToMouse({
      x: window.innerWidth / 2,
      y: 50 * window.innerHeight,
    } as any);

    return () => window.removeEventListener("mousemove", attachToMouse);
  }, []);

  return (
    <p
      className={twMerge(
        "fixed w-[25vw] bg-background text-red-300 py-2 px-3 duration-100 text-sm",
        props.className
      )}
      ref={ref}
      style={position}
    >
      Please fix all errors before being able to insert new entries <br /> Refer
      to docs if you need help
    </p>
  );
}
