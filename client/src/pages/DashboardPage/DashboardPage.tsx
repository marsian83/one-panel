import { useState } from "react";
import MaterialIcon from "../../common/MaterialIcon";
import { twMerge } from "tailwind-merge";
import dummyDatabases from "../../assets/data/databases";
import DatabaseCard from "./components/DatabaseCard";
import useModal from "../../hooks/useModal";
import NewDatabaseModal from "./components/NewDatabaseModal";

type View = "GRID" | "LIST";

export default function DashboardPage() {
  const [view, setView] = useState<View>("GRID");
  const [searchQuery, setSearchQuery] = useState("");

  const views: { icon: string; view: View }[] = [
    { icon: "e9b0", view: "GRID" },
    { icon: "e896", view: "LIST" },
  ];

  const modal = useModal();

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
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
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

          <button
            className="bg-secondary px-8 text-black rounded-lg font-medium hover:brightness-75 duration-300"
            onClick={() => modal.show(<NewDatabaseModal />)}
          >
            Add New...
          </button>
        </div>

        {view === "GRID" ? (
          <section className="my-10 gap-4 grid grid-cols-3 justify-center">
            {dummyDatabases
              .filter((db) =>
                db.name.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((database) => (
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

function DatabaseListItem() {}
