import { Schema } from "../interfaces/Data";

export class SchemaController {
  definition: Schema["definition"];

  constructor() {
    this.definition = [];
  }

  define(definition: Schema["definition"]) {
    this.definition = definition;
  }

  validate(object: { [key in (typeof this.definition)[number]["name"]]: any }) {
    const keys = this.definition.map((d) => d.name);

    // Check if all required fields are present
    for (let entry of this.definition) {
      if (!entry.optional && !object[entry.name]) {
        return {
          valid: false,
          erronousIndex: this.definition.indexOf(entry),
          message: `Required field ${entry.name} is not defined`,
        };
      }
    }

    // Check if any extra invalid fields are present
    for (let key of Object.keys(object)) {
      if (!keys.includes(key)) {
        return {
          valid: false,
          message: `Invalid field ${key}`,
        };
      }
    }

    // Check if array type matches
    for (let entry of this.definition) {
      if (entry.array && !Array.isArray(object[entry.name])) {
        return {
          valid: false,
          erronousIndex: this.definition.indexOf(entry),
          message: `Field ${entry.name} expected Array of type ${
            entry.type
          } but got type ${typeof object[entry.name]}`,
        };
      }
    }

    // Recursive validation for nested fields
    for (let entry of this.definition) {
      if (typeof entry.type === typeof this.definition) {
        const item = object[entry.name];
        const sc = new SchemaController();
        sc.define(entry.type as typeof this.definition);

        // Check if a required object is present as non array
        if (!(typeof item === "object" && !Array.isArray(item))) {
          return {
            valid: false,
            erronousIndex: this.definition.indexOf(entry),
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
            erronousIndex: this.definition.indexOf(entry),
            message: `In ${entry.name}, ${rm}`,
          };
        }
      }
    }

    // Validate Types for non object entries
    for (let entry of this.definition) {
      if (
        (object[entry.name] || !entry.optional) &&
        typeof entry.type !== typeof this.definition &&
        typeof object[entry.name] !== entry.type
      ) {
        return {
          valid: false,
          erronousIndex: this.definition.indexOf(entry),
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
