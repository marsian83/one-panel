import { useParams } from "react-router-dom";
import dummyCollections from "../../assets/data/collections";
import dummySchemas from "../../assets/data/schemas";
import { useEffect, useRef, useState } from "react";
import { SchemaController } from "../../helpers/schemaValidation";
import { purifyJson } from "../../helpers/utils";
import { twMerge } from "tailwind-merge";
import Editor from "@monaco-editor/react";
import { Collection, Schema } from "../../interfaces/Data";
import api from "../../helpers/api";

export default function SchemaPage() {
  const { id } = useParams();
  const [collection, setCollection] = useState<Collection>();

  const [schema, setSchema] = useState("[]");

  const [schemaError, setSchemaError] = useState("");
  const [result, setResult] = useState({ valid: false, message: "" });

  // Schema Handlers
  const sc = new SchemaController();

  function setSchemaFromValue(value?: string) {
    setSchemaError("");
    const impureJson = value || "";
    const pureJson = purifyJson(impureJson);
    try {
      JSON.parse(pureJson);
      setSchema(pureJson);
    } catch (err) {
      setSchemaError((err as any).message);
    }
    validateObjectAgainstSchema();
  }

  async function validateObjectAgainstSchema(objStr?: string) {
    sc.define(JSON.parse(schema));
    const d = purifyJson(objStr || "{}");
    try {
      JSON.parse(d);
    } catch (err) {
      setResult({ valid: false, message: `Invalid JSON - Err : ${err}` });
    }
    const result = sc.validate(JSON.parse(d));
    setResult(result);
  }

  // loadData
  async function loadData() {
    const collection = await api.getCollection(Number(id));
    setCollection(collection);
    setSchema(JSON.stringify(collection.schema));
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="h-[80vh] flex p-page">
      <div className="basis-1/2 flex relative justify-center">
        <Editor
          className="w-11/12 h-11/12 resize-none bg-transparent border"
          theme="one-dark"
          language="json"
          defaultValue={schema}
          onChange={setSchemaFromValue}
        />
        <p className="absolute bottom-1 bg-background left-1 text-red-500">
          {schemaError}
        </p>
      </div>
      <div className="basis-1/2 flex relative justify-center">
        <Editor
          className="w-11/12 h-11/12 resize-none bg-transparent border"
          theme="one-dark"
          language="json"
          defaultValue={"{}"}
          onChange={validateObjectAgainstSchema}
          onMount={() => validateObjectAgainstSchema("{}")}
        />
        <p
          className={twMerge(
            "absolute bottom-1 bg-background left-1",
            result.valid ? "text-green-500" : "text-red-500"
          )}
        >
          {result.message}
        </p>
      </div>
    </div>
  );
}
