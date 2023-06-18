import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getTokenFromLocalStorage } from "../utils";
import api, { clearJwt, setJwt } from "../api";

interface AuthContextType {}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  const value = {};

  useEffect(() => {
    (async function () {
      await checkAndValidateLocalToken();

      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {loading ? <p>loading...</p> : children}
    </AuthContext.Provider>
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
