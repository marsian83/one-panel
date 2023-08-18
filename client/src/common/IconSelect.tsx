import { twMerge } from "tailwind-merge";
import { icons } from "../assets/data/icons";
import MaterialIcon from "./MaterialIcon";
import { useEffect, useRef, useState } from "react";
import useClickOutside from "../hooks/useClickOutside";

interface IconSelectProps {
  className?: string;
  iconState: [string, React.Dispatch<React.SetStateAction<string>>];
}

export default function IconSelect(props: IconSelectProps) {
  const [showingOptions, setShowingOptions] = useState(false);
  const [icon, setIcon] = props.iconState;

  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;
  const outsideTrigger = useClickOutside(ref);

  useEffect(() => {
    setShowingOptions(false);
  }, [outsideTrigger]);

  return (
    <div className={twMerge("relative w-full", props.className)} ref={ref}>
      <input
        onClick={() => setShowingOptions((b) => !b)}
        type="text"
        className="w-full h-full outline-none border-none focus:border-none focus:outline-none"
        value={icon}
      />
      {showingOptions && (
        <div
          className="absolute px-3 py-5 border rounded-md border-front border-opacity-40 bottom-full left-0 w-full max-h-[10vw] overflow-y-scroll flex flex-wrap 
        gap-3 scrollbar-primary scrollbar-thin bg-background"
        >
          {icons.map((item) => (
            <button
              className="text-xl"
              key={icon}
              onClick={() => {
                setShowingOptions(false);
                setIcon(item);
              }}
            >
              {" "}
              <MaterialIcon codepoint={item} />{" "}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

{
  /* <select
  name="icon"
  className="border border-front border-opacity-30 capitalize px-2 py-1 rounded-md"
>
  {icons.map((icon) => (
    <option value={icon} className="capitalize text-black">
      <div className="text-xl bg-red-400">
        <MaterialIcon codepoint={"e9ba"} /> {icon}
      </div>
    </option>
  ))}
</select>; */
}
