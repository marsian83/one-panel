import { Schema } from "../interfaces/Data";

export class SchemaController {
  definition: Schema["definition"];

  constructor() {
    this.definition = [];
  }

  define(definition: Schema["definition"]) {
    this.definition = definition;
  }

  validate(object: object) {
    const keys = this.definition.map((d) => d.name);

    for (let entry of this.definition) {
      if (!entry.optional && !object[entry.name as keyof typeof object]) {
        return {
          valid: false,
          message: `Required field ${entry.name} is not defined`,
        };
      }
    }

    for (let key of Object.keys(object)) {
      if (!keys.includes(key)) {
        return {
          valid: false,
          message: `Invalid field ${key}`,
        };
      }
    }

    for (let entry of this.definition) {
      if (typeof entry.type === typeof this.definition) {
        const sc = new SchemaController();
        sc.define(entry.type as typeof this.definition);
        const result = sc.validate(object[entry.name as keyof typeof object]);
        const rm = result?.message as string;
        if (!result.valid) {
          return { valid: false, message: `In ${entry.name}, ${rm}` };
        }
      }
    }

    for (let entry of this.definition) {
      if (
        typeof entry.type !== typeof this.definition &&
        typeof object[entry.name as keyof typeof object] !== entry.type
      ) {
        return {
          valid: false,
          message: `Field ${entry.name} expected type ${
            entry.type
          } but got type ${typeof object[entry.name as keyof typeof object]}`,
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
      interf[definition.name] = definition.type;
    });
    return interf;
  }
}
