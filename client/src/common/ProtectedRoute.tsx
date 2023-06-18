import { Navigate, Outlet } from "react-router-dom";
import api from "../api";

export default function ProtectedRoute() {
  const authHeader = api.client.defaults.headers["Authorization"] as string;
  const token = authHeader && authHeader.split(" ")[1];

  const auth = token && token != "null";

  return auth ? <Outlet /> : <Navigate to="/auth" />;
}
