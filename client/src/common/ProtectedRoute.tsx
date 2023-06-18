import { Navigate, Outlet } from "react-router-dom";
import api from "../api";

export enum ProtectedTypes {
  PRIVATEONLY,
  PUBLICONLY,
}

interface ProtectedRouteProps {
  type: ProtectedTypes;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const authHeader = api.client.defaults.headers["Authorization"] as string;
  const token = authHeader && authHeader.split(" ")[1];

  const auth = token && token != "null";

  if (props.type === ProtectedTypes.PRIVATEONLY) {
    return auth ? <Outlet /> : <Navigate to="/auth" />;
  }

  if (props.type === ProtectedTypes.PUBLICONLY) {
    return !auth ? <Outlet /> : <Navigate to="/" />;
  }

  return <Navigate to="/" />;
}
