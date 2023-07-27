import { useParams } from "react-router-dom";
import dummyArtifacts from "../../assets/data/artifacts";
import dummyCollections from "../../assets/data/collections";
import MaterialIcon from "../../common/MaterialIcon";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function PanelPage() {
  const { id } = useParams();
  const artifact = dummyArtifacts.filter((a) => a.id === Number(id))[0];
  const collections = dummyCollections.filter((c) =>
    artifact.collections.includes(c.id)
  );

  const [selectedCollection, setSelectedCollection] = useState(
    collections[0].id
  );

  return (
    <div className="h-[85vh] flex">
      <div className="basis-1/6 flex flex-col h-full justify-between">
        <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-primary gap-y-2 flex flex-col">
          {collections.map((collection) => (
            <button
              className={twMerge(
                "bg-foreground bg-opacity-5 text-center py-4",
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
        <button className="flex items-center gap-x-2 justify-center bg-primary text-secondary py-5 bg-opacity-20">
          <MaterialIcon codepoint="e8b8" /> Settings
        </button>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
