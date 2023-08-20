import { Schema } from "../interfaces/Data";
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

  getInterfaceString() {
    let interf: any = {};
    this.definition.forEach((definition) => {
      if (Array.isArray(definition.type)) {
        const insideValidator = new SchemaController();
        insideValidator.define(definition.type);
        interf[definition.name] = insideValidator.getInterfaceString;
      }
      if (definition.type === "reference") {
      }
      interf[`${definition.name}${definition.optional ? "?" : ""}`] =
        definition.type;
    });
    return JSON.stringify(interf);
  }
}
