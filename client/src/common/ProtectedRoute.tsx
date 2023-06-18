import { Navigate, Outlet } from "react-router-dom";
import api, { clearJwt, setJwt } from "../api";
import { getTokenFromLocalStorage } from "../utils";
import { useEffect, useState } from "react";

export enum ProtectedTypes {
  PRIVATEONLY,
  PUBLICONLY,
}

interface ProtectedRouteProps {
  type: ProtectedTypes;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  let auth;

  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const authHeader = api.client.defaults.headers["Authorization"] as string;
    const token = authHeader && authHeader.split(" ")[1];

    auth = token && token != "null";
    setFlag(true);
  }, []);

  return (
    <>
      {flag ? auth ? <Outlet /> : <Navigate to="/auth" /> : <p>Loading...</p>}
    </>
  );
}

async function checkAndValidateLocalToken() {
  const token = getTokenFromLocalStorage();
  if (token) {
    if (await api.validateToken(token)) {
      return setJwt(token);
    }
    clearJwt();
  }
}
