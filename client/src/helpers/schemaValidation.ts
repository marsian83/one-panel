import { Definition, Schema } from "../interfaces/Data";
import { deepCopy } from "./utils";

export class SchemaController {
  definition: Schema["definition"];

  constructor() {
    this.definition = [];
  }

  define(definition: Schema["definition"]) {
    this.definition = definition;
  }

  validate(object: { [key in (typeof this.definition)[number]["name"]]: any }) {
    const definition = deepCopy(this.definition);
    const keys = definition.map((d) => d.name);

    // Check if any extra invalid fields are present
    for (let key of Object.keys(object)) {
      if (!keys.includes(key)) {
        return {
          valid: false,
          message: `Invalid field ${key}`,
        };
      }
    }

    // Check if all required fields are present
    for (let entry of definition) {
      if (entry.type === "reference") entry.type = "number";

      if (!entry.optional && !object[entry.name]) {
        return {
          valid: false,
          erronousIndex: definition.indexOf(entry),
          message: `Required field ${entry.name} is not defined`,
        };
      }

      // Check if array type matches
      if (entry.array && !Array.isArray(object[entry.name])) {
        return {
          valid: false,
          erronousIndex: definition.indexOf(entry),
          message: `Field ${entry.name} expected Array of type ${
            entry.type
          } but got type ${typeof object[entry.name]}`,
        };
      }

      if (entry.array) {
        const iterArr = object[entry.name] as Array<any>;

        for (let ei = 0; ei < iterArr.length; ei++) {
          if (typeof iterArr[ei] !== entry.type) {
            return {
              valid: false,
              erronousIndex: definition.indexOf(entry),
              message: `Field ${entry.name} expected Array of type ${
                entry.type
              } but got entry ${iterArr[ei]} at index ${ei} as ${typeof iterArr[
                ei
              ]}`,
            };
          }
        }
      }

      // Recursive validation for nested fields
      if (typeof entry.type === typeof definition) {
        const item = object[entry.name];
        const sc = new SchemaController();
        sc.define(entry.type as typeof definition);

        // Check if a required object is present as non array
        if (!(typeof item === "object" && !Array.isArray(item))) {
          return {
            valid: false,
            erronousIndex: definition.indexOf(entry),
            message: `Field ${
              entry.name
            } expected type ${sc.getInterfaceString()} but got type ${typeof object[
              entry.name
            ]}`,
          };
        }

        // Validate nested items
        const result = sc.validate(item);
        const rm = result?.message as string;
        if (!result.valid) {
          return {
            valid: false,
            erronousIndex: definition.indexOf(entry),
            message: `In ${entry.name}, ${rm}`,
          };
        }
      }

      // Validate Types for non object entries
      if (
        (object[entry.name] || !entry.optional) &&
        !entry.array &&
        typeof entry.type !== typeof definition &&
        typeof object[entry.name] !== entry.type
      ) {
        return {
          valid: false,
          erronousIndex: definition.indexOf(entry),
          message: `Field ${entry.name} expected type ${
            entry.type
          } but got type ${typeof object[entry.name]}`,
        };
      }
    }

    return { valid: true, message: "Valid" };
  }

  getInterfaceString(): string {
    let interfaceString = "{";
    const definition = this.definition;

    for (const entry of definition) {
      if (Array.isArray(entry.type)) {
        const midSC = new SchemaController();
        midSC.define(entry.type);
        const nestedInterface = midSC.getInterfaceString();
        interfaceString += `${entry.name}${
          entry.optional ? "?" : ""
        }: ${nestedInterface}[];\n`;
      } else if (entry.type === "reference") {
        interfaceString += `${entry.name}${entry.optional ? "?" : ""}: ${
          entry.refers || "unknown"
        };\n`;
      } else {
        interfaceString += `${entry.name}${entry.optional ? "?" : ""}: ${
          entry.type
        };\n`;
      }
    }

    interfaceString += "}\n";
    return interfaceString;
  }
}

type ValidationError = string;
export function checkValidDefinition(arr: any[]): ValidationError[] | true {
  const errors: ValidationError[] = [];
  const encounteredNames: Set<string> = new Set(); // Keep track of encountered names

  if (!Array.isArray(arr)) {
    errors.push("Input is not an array.");
    return errors;
  }

  for (const item of arr) {
    if (!item || typeof item !== "object") {
      errors.push("Each item must be an object.");
      continue;
    }

    if (typeof item.name !== "string" || !item.type) {
      errors.push("Each item must have a 'name' and 'type' property.");
    } else {
      // Check if the name is already encountered on the same level
      if (encounteredNames.has(item.name)) {
        errors.push("Each name must be unique on the same level.");
      } else {
        encounteredNames.add(item.name);
      }
    }

    if (!item || typeof item !== "object") {
      errors.push("Each item must be an object.");
      continue;
    }

    if (typeof item.name !== "string" || !item.type) {
      errors.push("Each item must have a 'name' and 'type' property.");
    }

    if (item.optional !== undefined && typeof item.optional !== "boolean") {
      errors.push("The 'optional' property must be a boolean.");
    }

    if (item.array !== undefined && typeof item.array !== "boolean") {
      errors.push("The 'array' property must be a boolean.");
    }

    if (
      item.type !== "string" &&
      item.type !== "number" &&
      item.type !== "reference" &&
      !Array.isArray(item.type)
    ) {
      errors.push("Invalid 'type' property value.");
    }

    if (
      item.type === "reference" &&
      (typeof item.refers !== "string" || !item.refers)
    ) {
      errors.push("The 'refers' property must be a non-empty string.");
    }

    if (Array.isArray(item.type)) {
      const nestedErrors = checkValidDefinition(item.type);
      if (nestedErrors !== true) {
        errors.push(...nestedErrors);
      }
    }
  }

  return errors.length ? errors : true;
}
