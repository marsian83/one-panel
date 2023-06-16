export const defaultCacheTimeout = 3 * 60 * 1000;

export const serverUrl =
  import.meta.env.MODE === "development" || !import.meta.env.VITE_BACKEND_URL
    ? `http://127.0.0.1:${9090}`
    : import.meta.env.VITE_BACKEND_URL;
