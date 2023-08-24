/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_URL: string;
  readonly VITE_PUBLIC_ENDPOINT_BASE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
