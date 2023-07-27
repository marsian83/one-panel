import { Link, useParams } from "react-router-dom";
import dummyDatabases from "../../assets/data/databases";
import dummyArtifacts from "../../assets/data/artifacts";
import Header from "./components/Header";
import { Artifact } from "../../interfaces/Data";
import MaterialIcon from "../../common/MaterialIcon";
import { isColorLight } from "../../utils";
import dummyCollections from "../../assets/data/collections";

export default function DatabasePage() {
  const { id } = useParams();

  const database = dummyDatabases.filter((db) => db.id === Number(id))[0];

  const artifacts = dummyArtifacts.filter((artifact) =>
    database.artifacts.includes(artifact.id)
  );

  return (
    <>
      <Header name={database.name} />

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
            {artifacts.map((artifact) => (
              <ArtifactCard artifact={artifact} />
            ))}
            <button className="border-foreground border group bg-background border-opacity-40 border-dashed rounded flex flex-col justify-center items-center">
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

  const collections = dummyCollections
    .filter((c) => artifact.collections.includes(c.id))
    .map((cl) => cl.name);

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
        {artifact.collections.length === 0 && "No collections"}
        {collections.join(", ")}
      </p>
    </Link>
  );
}
