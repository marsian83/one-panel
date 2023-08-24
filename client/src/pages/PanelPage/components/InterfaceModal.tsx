import { useEffect, useRef, useState } from "react";
import { Icon, icons } from "../../../assets/data/icons";
import api from "../../../helpers/api";
import { Color, colors } from "../../../assets/data/colors";
import ModalDefault from "../../../common/ModalDefault";
import { Definition } from "../../../interfaces/Data";
import { SchemaController } from "../../../helpers/schemaValidation";

export default function InterfaceModal(props: {
  name: string;
  schema: Definition;
}) {
  const [interfaceD, setInterface] = useState<string>("{}");

  useEffect(() => {
    const sc = new SchemaController();
    sc.define(props.schema);
    setInterface(sc.getInterfaceString());
  }, []);

  return (
    <ModalDefault type="singleButtonClose">
      <div className="p-8 flex flex-col gap-y-3">
        <h2 className="font-medium text-2xl tracking-tight">
          Use this interface within typescript
        </h2>

        <textarea
          value={`interface ${props.name} ${prettifyInterface(interfaceD)}`}
          autoFocus
          className="max-w-[50vw] bg-transparent text-front h-[40vh] p-3 border border-primary rounded mt-5 mb-2"
          readOnly
        />
      </div>
    </ModalDefault>
  );
}

function prettifyInterface(input: string): string {
  const INDENTATION = 2;
  const NEWLINE = "\n";

  let level = 0;
  let formatted = "";
  let insideString = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    if (char === '"' && input[i - 1] !== "\\") {
      insideString = !insideString;
    }

    if (insideString) {
      formatted += char;
      continue;
    }

    if (char === "[" || char === "{") {
      level++;
      formatted += char + NEWLINE + " ".repeat(level * INDENTATION);
    } else if (char === "]" || char === "}") {
      level--;
      formatted = formatted.trimEnd();
      formatted += NEWLINE + " ".repeat(level * INDENTATION) + char;
    } else if (char === ",") {
      formatted += char + NEWLINE + " ".repeat(level * INDENTATION);
    } else {
      formatted += char;
    }
  }

  return formatted;
}
