import { Link } from "react-router-dom";
import { Database } from "../../../interfaces/Data";
import { twMerge } from "tailwind-merge";
import MaterialIcon from "../../../common/MaterialIcon";
import { getDateDifferenceString } from "../../../utils";

export default function DatabaseCard(props: {
  database: Database;
  className?: string;
}) {
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
