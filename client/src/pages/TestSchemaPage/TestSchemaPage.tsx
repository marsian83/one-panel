import { useRef, useState } from "react";
import { SchemaController } from "../../helpers/schemaValidation";
import { purifyJson } from "../../utils";
import { twMerge } from "tailwind-merge";
import CodeMirror from "@uiw/react-codemirror";
import { EditorView } from "@codemirror/view";

let myTheme = EditorView.theme(
  {
    "&": {
      color: "white",
      backgroundColor: "#034",
    },
    ".cm-content": {
      caretColor: "#0e9",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: "#0e9",
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#074",
    },
    ".cm-gutters": {
      backgroundColor: "#045",
      color: "#ddd",
      border: "none",
    },
  },
  { dark: true }
);

export default function TestSchemaPage() {
  const [schema, setSchema] = useState("[]");

  const [schemaError, setSchemaError] = useState("");
  const [result, setResult] = useState({ valid: false, message: "" });

  const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`);

  const schemaRef = useRef() as React.MutableRefObject<any>;
  const objectRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;

  const sc = new SchemaController();

  function setSchemaFromInput() {
    setSchemaError("");
    const impureJson = schemaRef.current.value;
    const pureJson = purifyJson(impureJson);
    try {
      JSON.parse(pureJson);
      setSchema(pureJson);
    } catch (err) {
      setSchemaError((err as any).message);
    }
    validateObjectAgainstSchema();
  }

  async function validateObjectAgainstSchema() {
    sc.define(JSON.parse(schema));
    const d = purifyJson(objectRef.current.value);
    try {
      JSON.parse(d);
    } catch (err) {
      setResult({ valid: false, message: `Invalid JSON - Err : ${err}` });
    }
    const result = sc.validate(JSON.parse(d));
    setResult(result);
  }

  return (
    <div className="h-[80vh] flex p-page">
      <div className="basis-1/2 flex relative justify-center">
        <textarea
          className="w-11/12 h-11/12 resize-none bg-transparent border"
          ref={schemaRef}
          onChange={setSchemaFromInput}
        ></textarea>
        {/* <CodeMirror
          className="w-11/12 h-11/12 resize-none bg-transparent text-back border"
          onChange={setSchemaFromInput}
          ref={schemaRef}
          theme={myTheme}
          lang="JSON"
        /> */}
        <p className="absolute bottom-1 bg-background left-1 text-red-500">
          {schemaError}
        </p>
      </div>
      <div className="basis-1/2 flex relative justify-center">
        <textarea
          className="w-11/12 h-11/12 resize-none bg-transparent border"
          ref={objectRef}
          onChange={validateObjectAgainstSchema}
        ></textarea>
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
