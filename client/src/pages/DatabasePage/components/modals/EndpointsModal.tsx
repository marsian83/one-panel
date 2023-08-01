import { Link, useParams } from "react-router-dom";
import ModalDefault from "../../../../common/ModalDefault";

import dummyDatabases from "../../../../assets/data/databases";
import dummyArtifacts from "../../../../assets/data/artifacts";

import { Artifact } from "../../../../interfaces/Data";
import MaterialIcon from "../../../../common/MaterialIcon";
import {
  getHashCodeFromStringInsecurely,
  isColorLight,
  str2blks_MD5,
} from "../../../../utils";
import dummyCollections from "../../../../assets/data/collections";
import { useState } from "react";

export default function EndpointsModal() {
  const { id } = useParams();
  const database = dummyDatabases.filter((db) => db.id === Number(id))[0];

  const artifacts = dummyArtifacts.filter((artifact) =>
    database.artifacts.includes(artifact.id)
  );
  return (
    <ModalDefault type="singleButtonClose" closeText="Close">
      <div className="p-8 flex flex-col gap-y-4 max-h-[50vh] overflow-y-scroll scrollbar-hidden">
        {artifacts.map((artifact, i) => (
          <ArtifactCard artifact={artifact} />
        ))}
      </div>
    </ModalDefault>
  );
}

function ArtifactCard(props: { artifact: Artifact }) {
  const { artifact } = props;

  const collections = dummyCollections.filter((c) =>
    artifact.collections.includes(c.id)
  );

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div
      onClick={() => setShowDropdown(!showDropdown)}
      className="hover:cursor-pointer border relative p-4 border-foreground border-opacity-30 rounded duration-300 hover:border-[var(--artifact-color)] hover:border-opacity-100 group"
      style={
        {
          "--artifact-color": artifact.color,
          "--contrast-color": isColorLight(artifact.color) ? "black" : "white",
        } as React.CSSProperties
      }
    >
      {/* <MaterialIcon
        codepoint="e3c9"
        className="absolute top-0 right-0 duration-inherit z-1 bg-[var(--artifact-color)] text-[var(--contrast-color)] rounded-full w-8 h-8 flex justify-center items-center translate-x-1/3 group-hover:-translate-y-1/3 
        aspect-square text-lg opacity-0 pointer-events-none group-hover:opacity-100"
      /> */}
      <div className="flex items-center gap-x-4 duration-inherit justify-between">
        <div className="flex gap-x-4">
          <MaterialIcon
            codepoint={artifact.icon.codepoint}
            className="duration-inherit w-10 h-10 flex justify-center items-center text-3xl aspect-square rounded-full bg-[var(--artifact-color)] text-[var(--contrast-color)]"
          />
          <h5 className="duration-inherit">{artifact.name}</h5>
        </div>
        <button>
          <MaterialIcon
            codepoint="e5cf"
            className={`duration-300 z-1 bg-[var(--artifact-color)] text-[var(--contrast-color)] rounded-full w-8 h-8 flex justify-center items-center
          aspect-square text-lg opacity-50 pointer-events-none group-hover:opacity-100 ${
            showDropdown ? "rotate-180" : ""
          } `}
          />
        </button>
      </div>
      <div
        className={` ${
          showDropdown ? "" : "hidden"
        } mt-4 truncate text-sm text-front text-opacity-75 duration-inherit flex flex-col gap-y-6`}
      >
        {artifact.collections.length === 0 && "No collections"}
        {collections.map((collection, i) => (
          <div className="border-b pb-2 border-front border-opacity-25 flex justify-between">
            <div>{collection.name}</div>
            <div className="flex fle-col items-center justify-end gap-x-2">
              <div className="w-[70%] truncate">
                api.onepanel.tech/
                {str2blks_MD5(`${collection.id.toString()}`)}
              </div>
              <MaterialIcon codepoint="e14d" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
