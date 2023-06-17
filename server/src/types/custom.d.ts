export const SUPPORTED_LANGUAGES = ["en", "es", "it"];

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export type User = {
  id: number;
  username: string;
};
