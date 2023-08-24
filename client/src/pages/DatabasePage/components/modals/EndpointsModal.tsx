import { Link, useParams } from "react-router-dom";
import ModalDefault from "../../../../common/ModalDefault";

import dummyDatabases from "../../../../assets/data/databases";
import dummyArtifacts from "../../../../assets/data/artifacts";

import { Artifact, Database } from "../../../../interfaces/Data";
import MaterialIcon from "../../../../common/MaterialIcon";
import {
  getHashCodeFromStringInsecurely,
  isColorLight,
  str2blks_MD5,
} from "../../../../helpers/utils";
import dummyCollections from "../../../../assets/data/collections";
import React, { useEffect, useRef, useState } from "react";
import api from "../../../../helpers/api";
import Loader from "../../../../common/Loader";

export default function EndpointsModal() {
  const { id } = useParams();
  const [database, setDatabase] = useState<Database>();

  async function loadData() {
    const db = await api.getDatabase(Number(id));
    setDatabase(db);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ModalDefault type="singleButtonClose" closeText="Close">
      <div className="p-8 flex flex-col gap-y-4 max-h-[50vh] overflow-y-scroll scrollbar-hidden">
        {database ? (
          database.artifacts.map((artifact, key) => (
            <ArtifactCard artifact={artifact} key={key} />
          ))
        ) : (
          <div className="m-10">
            Loading{" "}
            <div className="h-10 w-10">
              <Loader />
            </div>
          </div>
        )}
      </div>
    </ModalDefault>
  );
}

function ArtifactCard(props: { artifact: Artifact }) {
  const { artifact } = props;

  const [endpoints, setEndpoints] = useState<{ id: number; uri: string }[]>();
  const [showDropdown, setShowDropdown] = useState(false);

  const endpointsBaseUrl = import.meta.env.VITE_PUBLIC_ENDPOINT_BASE;

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  function copy(txt: string) {
    inputRef.current.value = txt;
    inputRef.current.select();
    console.log(inputRef.current.value);
    document.execCommand("copy");
  }

  async function loadData() {
    const ep = await api.getArtifactEndpoints(artifact.id);
    setEndpoints(ep);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div
      className="border relative p-4 border-foreground border-opacity-30 rounded duration-300 hover:border-[var(--artifact-color)] hover:border-opacity-100 group"
      style={
        {
          "--artifact-color": artifact.color,
          "--contrast-color": isColorLight(artifact.color) ? "black" : "white",
        } as React.CSSProperties
      }
    >
      <input
        readOnly
        type="text"
        className="opacity-0 h-0 m-0 p-0 absolute"
        ref={inputRef}
      />
      <div
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-x-4 duration-inherit cursor-pointer justify-between"
      >
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
        {endpoints &&
          endpoints.map((endpoint, key) => (
            <div
              key={key}
              className="border-b pb-2 border-front border-opacity-25 flex justify-between"
            >
              <div>
                {
                  artifact.collections.filter((c) => c.id === endpoint.id)[0]
                    .name
                }
              </div>
              <div className="flex fle-col items-center justify-end gap-x-2">
                <p className="truncate max-w-[20vw]">
                  {`${endpointsBaseUrl}/d/${endpoint.uri}`}
                </p>
                <button
                  onClick={() => copy(`${endpointsBaseUrl}/d/${endpoint.uri}`)}
                >
                  <MaterialIcon codepoint="e14d" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
