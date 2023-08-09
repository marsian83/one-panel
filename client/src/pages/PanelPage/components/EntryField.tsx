import { useState } from "react";
import { SchemaController } from "../../../helpers/schemaValidation";
import { Definition } from "../../../interfaces/Data";
import { updateNestedObject } from "../../../utils";

interface EntryFieldProps {
  schema: Definition;
  data: object;
  setData: React.Dispatch<React.SetStateAction<object>>;
  disableLine?: boolean;
  nest: string[];
}

export default function EntryField(props: EntryFieldProps) {
  const sc = new SchemaController();
  sc.define(props.schema);

  return (
    <div className="flex ml-10 relative">
      {!props.disableLine && <div className="bg-white w-[1px] self-stretch" />}
      <div className="flex-1 flex flex-col gap-y-3 pl-2">
        {props.schema.map((entry) => (
          <article className="flex flex-col gap-y-1">
            <h5 className="text-front text-opacity-75">{entry.name}</h5>
            {Array.isArray(entry.type) ? (
              <EntryField
                schema={entry.type}
                data={props.data}
                setData={props.setData}
                nest={[...props.nest, entry.name]}
              />
            ) : (
              <EntryInput
                entry={entry}
                data={props.data}
                setData={props.setData}
                nest={props.nest}
              />
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

function EntryInput(props: {
  entry: Definition[0];
  data: object;
  setData: React.Dispatch<React.SetStateAction<object>>;
  nest: string[];
}) {
  const { entry, setData } = props;

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    const tempObj = JSON.parse(JSON.stringify(props.data));
    setData(
      updateNestedObject(
        [...props.nest, entry.name],
        tempObj,
        event.target.value
      )
    );
  }

  return (
    <div className="w-full">
      <input
        className="border border-front border-opacity-20 w-full p-2"
        onChange={onChangeHandler}
      />
    </div>
  );
}
