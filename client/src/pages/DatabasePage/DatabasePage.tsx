import { Link, useParams } from "react-router-dom";
import Header from "./components/Header";
import { Artifact, Database } from "../../interfaces/Data";
import MaterialIcon from "../../common/MaterialIcon";
import { isColorLight } from "../../helpers/utils";
import dummyCollections from "../../assets/data/collections";
import api from "../../helpers/api";
import { useEffect, useState } from "react";
import NewArtifactModal from "./components/modals/NewArtifactModal";
import useModal from "../../hooks/useModal";

export default function DatabasePage() {
  const { id } = useParams();
  const [database, setDatabase] = useState<Database>();

  async function loadData() {
    const database = await api.getDatabase(Number(id));
    setDatabase(database);
  }

  useEffect(() => {
    loadData();
  }, []);

  const modal = useModal();

  return (
    <>
      <Header
        name={database ? database.name : "loading"}
        uri={database ? database.uri : "loading"}
      />

      <section className="bg-foreground bg-opacity-10 p-page-lg py-12 min-h-[70vh]">
        <div className="flex justify-between">
          <h1 className="text-2xl font-medium tracking-tight">
            Active Database
          </h1>
          <div className="flex gap-x-3">
            <button className="btn-1 px-3 py-1 text-sm">Logs</button>
            <button className="btn-1   px-3 py-1 text-sm">Admins</button>
          </div>
        </div>
        <div className="py-6 my-10 border border-foreground border-opacity-30 rounded-md bg-background">
          <h2 className="text-3xl font-raleway font-medium text-center my-4">
            Artifacts
          </h2>
          <div className="grid grid-cols-3 p-6 gap-6">
            {database ? (
              database.artifacts.map((artifact) => (
                <ArtifactCard key={artifact.id} artifact={artifact} />
              ))
            ) : (
              <p className="justify-center flex h-full items-center text-front text-opacity-60">
                loading artifacts...
              </p>
            )}
            <button
              onClick={() => modal.show(<NewArtifactModal dbId={Number(id)} />)}
              className="border-foreground border p-2 group bg-background border-opacity-40 border-dashed rounded flex flex-col justify-center items-center"
            >
              <MaterialIcon
                codepoint="e145"
                className="bg-foreground bg-opacity-30 text-4xl aspect-square text-center p-1 rounded duration-300 group-hover:bg-opacity-0"
              />
              <p className="text-sm mt-1 text-front text-opacity-80">New</p>
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function ArtifactCard(props: { artifact: Artifact }) {
  const { artifact } = props;

  return (
    <Link
      to={`/panel/${artifact.id}`}
      className="border relative border-foreground p-3 border-opacity-30 rounded duration-300 hover:border-[var(--artifact-color)] hover:border-opacity-100 group"
      style={
        {
          "--artifact-color": artifact.color,
          "--contrast-color": isColorLight(artifact.color) ? "black" : "white",
        } as React.CSSProperties
      }
    >
      <MaterialIcon
        codepoint="e3c9"
        className="absolute top-0 right-0 duration-inherit z-1 bg-[var(--artifact-color)] text-[var(--contrast-color)] rounded-full w-8 h-8 flex justify-center items-center translate-x-1/3 group-hover:-translate-y-1/3 
        aspect-square text-lg opacity-0 pointer-events-none group-hover:opacity-100"
      />
      <div className="flex items-center gap-x-4 duration-inherit">
        <MaterialIcon
          codepoint={artifact.icon.codepoint}
          className="duration-inherit w-10 h-10 flex justify-center items-center text-3xl aspect-square rounded-full bg-[var(--artifact-color)] text-[var(--contrast-color)]"
        />
        <h5 className="duration-inherit">{artifact.name}</h5>
      </div>
      <p className="mt-4 duration-inherit truncate text-sm text-front text-opacity-75 pr-[10%]">
        {!artifact.collections.length && "No collections"}
        {artifact.collections.map((c) => c.name).join(", ")}
      </p>
    </Link>
  );
}
