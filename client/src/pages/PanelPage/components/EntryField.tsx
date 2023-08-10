import { useEffect, useState } from "react";
import { SchemaController } from "../../../helpers/schemaValidation";
import { Definition } from "../../../interfaces/Data";
import { getNestedValue, updateNestedObject } from "../../../utils";

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

  const [validationResult, setValidationResult] =
    useState<ReturnType<typeof sc.validate>>();

  useEffect(() => {
    const result = sc.validate(getNestedValue(props.nest, props.data));
    setValidationResult(result);
  }, [props.data]);

  return (
    <div className="flex ml-10 relative">
      {!props.disableLine && <div className="bg-white w-[1px] self-stretch" />}
      <div className="flex-1 flex flex-col gap-y-3 pl-2">
        {props.schema.map((entry, index) => (
          <article key={index} className="flex flex-col gap-y-1">
            <h5 className="text-front text-opacity-75">
              {entry.name}
              {validationResult?.erronousIndex === index && (
                <span className="ml-5 text-xs text-red-500">
                  {validationResult.message}
                </span>
              )}
            </h5>
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
        getParsedValue(event.target.value)
      )
    );
  }

  function getParsedValue(value: string) {
    if (entry.type === "number") {
      return Number(value);
    }
    return value;
  }

  return (
    <div className="w-full">
      <input
        className="border border-front border-opacity-20 w-full p-2"
        onChange={onChangeHandler}
        placeholder={entry.type as string}
        type={entry.type === "number" ? "number" : "text"}
      />
    </div>
  );
}
