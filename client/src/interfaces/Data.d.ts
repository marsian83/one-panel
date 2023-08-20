import { Color } from "../assets/data/colors";
import { Icon } from "../assets/data/icons";

export enum Plan {
  basic = "BASIC",
  omega = "OMEGA",
  premium = "PREMIUM",
}

export interface Database {
  id: number;
  name: string;
  plan: Plan;
  icon: { codepoint?: Icon; imageUrl?: string };
  artifacts: Artifact[];
  lastUpdated: string;
}

export interface Artifact {
  id: number;
  name: string;
  color: Color;
  icon: {
    codepoint: Icon;
  };
  collections: { id: number; name: string }[];
}

export interface Collection {
  id: number;
  name: string;
  schema?: Definition;
}

export interface Schema {
  definition: Definition;
}

export type Definition = {
  name: string;
  optional?: boolean;
  type: Type;
}[];

export type Type = "string" | "number" | "reference" | Definition;
