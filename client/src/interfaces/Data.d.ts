export enum Plan {
  basic = "BASIC",
  omega = "OMEGA",
  premium = "PREMIUM",
}

export interface Database {
  id: number;
  name: string;
  plan: Plan;
  icon: { codepoint?: string; imageUrl?: string };
  artifacts: number[];
  lastUpdated: number;
}

export interface Artifact {
  id: number;
  name: string;
  color: string;
  icon: {
    codepoint: string;
  };
  collections: number[];
}

export interface Collection {
  id: number;
  name: string;
  schema: number;
}

export interface Schema {
  id: number;
  definition: Definition;
}

export type Definition = {
  name: string;
  optional?: boolean;
  type: Type;
}[];

export type Type = "string" | "number" | "reference" | Definition;
