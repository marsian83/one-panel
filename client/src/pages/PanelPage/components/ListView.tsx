import { useEffect, useState } from "react";
import { Definition } from "../../../interfaces/Data";
import dummyEntries from "../../../assets/data/entries";
import { twMerge } from "tailwind-merge";
import MaterialIcon from "../../../common/MaterialIcon";

interface ListViewProps {
  schema: Definition;
  collectionId: number;
}

export default function ListView(props: ListViewProps) {
  const { schema } = props;

  const [visibility, setVisibility] = useState<object>({});

  const content = dummyEntries;

  return (
    <div className="flex flex-col">
      <div className="grid gap-2 w-max grid-cols-5">
        {schema.map((item) => (
          <label
            htmlFor={item.name}
            className="flex gap-x-2 cursor-pointer bg-foreground bg-opacity-[13%] rounded-full px-3 py-1"
          >
            <input
              type="checkbox"
              className="peer cursor-pointer"
              name={item.name}
              id={item.name}
              onChange={(event) => {
                setVisibility({
                  ...visibility,
                  [item.name]: event.target.checked,
                });
              }}
            />
            <p className="text-sm cursor-pointer">{item.name}</p>
          </label>
        ))}
      </div>

      <table className="flex-1 mt-10">
        <thead>
          <tr>
            {Object.keys(content[0]).map((item) =>
              visibility[item as keyof typeof visibility] ? (
                <th className="border h-16 font-medium">{item}</th>
              ) : (
                <></>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {content.map((val, key) => {
            return (
              <tr
                key={key}
                className="relative h-10 hover:bg-secondary hover:bg-opacity-30 cursor-pointer"
              >
                {Object.keys(content[0]).map((item) =>
                  visibility[item as keyof typeof visibility] ? (
                    <td className="border pl-2">
                      {JSON.stringify(val[item as keyof typeof val])}
                    </td>
                  ) : (
                    <></>
                  )
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
