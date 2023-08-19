import MaterialIcon from "../../../common/MaterialIcon";
import { Collection } from "../../../interfaces/Data";

interface CollectionCardProps {
  collection: Collection;
}

const options = [
  { icon: "e89e", tooltip: "Open panel" },
  { icon: "e3c9", tooltip: "Rename" },
  { icon: "ead3", tooltip: "Edit Schema" },
  { icon: "e872", tooltip: "Delete", color: "#bb1a1a" },
];

export default function CollectionCard(props: CollectionCardProps) {
  const { collection } = props;

  return (
    <div className="border border-front border-opacity-[15%] rounded-md">
      <h5 className="text-center py-3">{collection.name}</h5>
      <div className="rounded-b-inherit p-3 bg-foreground bg-opacity-10 justify-evenly flex">
        {options.map((option, key) => (
          <button key={key} className="relative group">
            <MaterialIcon
              style={option.color ? { color: option.color } : {}}
              codepoint={option.icon}
            />
            <p
              className="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-background px-3 py-1 border 
            border-front border-opacity-10 rounded"
            >
              {option.tooltip}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
