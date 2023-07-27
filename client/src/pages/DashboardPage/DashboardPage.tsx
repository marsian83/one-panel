import { useState } from "react";
import MaterialIcon from "../../common/MaterialIcon";
import { twMerge } from "tailwind-merge";
import { Database } from "../../interfaces/Data";
import dummyDatabases from "../../assets/data/databases";
import { Link } from "react-router-dom";
import { getDateDifferenceString } from "../../utils";

type View = "GRID" | "LIST";

export default function DashboardPage() {
  const [view, setView] = useState<View>("GRID");

  const views: { icon: string; view: View }[] = [
    { icon: "e9b0", view: "GRID" },
    { icon: "e896", view: "LIST" },
  ];

  return (
    <>
      <div className="px-[13vw]">
        <div className="flex gap-x-2 my-4">
          <div
            className="flex items-center bg-foreground bg-opacity-10 rounded-lg border border-front border-opacity-20 focus-within:bg-background focus-within:bg-opacity-100
        duration-300 before:top-0 before:left-0 before:h-full before:w-full before:absolute before:-z-1 before:bg-primary relative before:rounded-inherit before:bg-opacity-0
        focus-within:before:scale-x-[100.49%] focus-within:before:scale-y-[110%] focus-within:before:bg-opacity-80 before:duration-inherit flex-1"
          >
            <MaterialIcon
              codepoint="e8b6"
              className="p-3 selection:hidden pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 py-2 bg-transparent outline-none text-front text-opacity-80"
            />
          </div>

          <div className="flex items-center font-light gap-x-2 px-2 bg-foreground bg-opacity-10 rounded-lg border border-front border-opacity-20 text-front text-opacity-75">
            {views.map((item, i) => (
              <button
                className="flex justify-center items-center"
                key={i}
                onClick={() => setView(item.view)}
              >
                <MaterialIcon
                  codepoint={item.icon}
                  className={twMerge(
                    "p-1 rounded-md",
                    view === item.view && "bg-foreground bg-opacity-20"
                  )}
                />
              </button>
            ))}
          </div>

          <button className="bg-secondary px-8 text-black rounded-lg font-medium hover:brightness-75 duration-300">
            Add New...
          </button>
        </div>

        {view === "GRID" ? (
          <section className=" my-10 gap-4 grid grid-cols-3 justify-center">
            {dummyDatabases.map((database) => (
              <DatabaseCard
                key={database.id}
                className=""
                database={database}
              />
            ))}
          </section>
        ) : (
          <section></section>
        )}
      </div>
    </>
  );
}

function DatabaseCard(props: { database: Database; className?: string }) {
  const { database } = props;

  return (
    <Link
      to={`/databases/${database.id}`}
      className={twMerge(
        props.className,
        "bg-background border border-front border-opacity-30 rounded-md p-4 relative group duration-300 hover:border-opacity-100"
      )}
    >
      <MaterialIcon
        codepoint="e89e"
        className="absolute top-0 right-0 duration-inherit z-1 bg-front text-back rounded-full w-8 h-8 flex justify-center items-center translate-x-1/3 group-hover:-translate-y-1/3 
        aspect-square text-lg opacity-0 pointer-events-none group-hover:opacity-100"
      />
      <div className="flex">
        <div className="w-[15%] aspect-square border border-front border-opacity-30 rounded-full overflow-hidden flex justify-center items-center">
          {(() => {
            if (database.icon.imageUrl) {
              return (
                <img
                  src={database.icon.imageUrl}
                  className="aspect-square object-cover"
                />
              );
            }
            return (
              <MaterialIcon
                codepoint={database.icon.codepoint || "e2bd"}
                className="text-back text-3xl text-opacity-90 bg-foreground bg-opacity-90 w-full h-full flex justify-center items-center"
              />
            );
          })()}
        </div>

        <div className="flex-1 flex flex-col justify-between px-3">
          <h3 className="text-lg">{database.name}</h3>
          <p className="text-sm font-light text-front text-opacity-60">
            {database.artifacts.length} Artifacts
          </p>
        </div>
      </div>

      <p className="text-sm mt-6 text-front text-opacity-60">
        Updated {getDateDifferenceString(database.lastUpdated)}
      </p>
    </Link>
  );
}

function DatabaseListItem() {}
