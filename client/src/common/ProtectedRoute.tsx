import { ReactNode, useEffect } from "react";
import { Route, useNavigate } from "react-router-dom";
import api from "../api";

interface ProtectedRouteProps {
  element: ReactNode;
  path: string;
}

export default function ProtectedRoute(props: ProtectedRouteProps) {
  const authTokenPresent = api.client.defaults.headers["Authorization"] != null;

  return (
    <Route
      element={authTokenPresent ? props.element : <RedirectToAuth />}
      path={props.path}
    />
  );
}

function RedirectToAuth() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/auth");
  });

  return <></>;
}
