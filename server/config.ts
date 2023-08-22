export const frontendUrl =
  process.env.NODE_ENV === "development" || !process.env.FRONTEND_URL
    ? "localhost:5173"
    : process.env.FRONTEND_URL;

export const servicesBaseUrl = "http://127.0.0.1";

const allowedOrigins = [frontendUrl];
