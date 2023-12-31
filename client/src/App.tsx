import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useLocation,
} from "react-router-dom";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { ReactNode, useEffect, useState } from "react";
import ProtectedRoute, { ProtectedTypes } from "./common/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import DatabasePage from "./pages/DatabasePage/DatabasePage";
import PanelPage from "./pages/PanelPage/PanelPage";
import useModal from "./hooks/useModal";
import { twMerge } from "tailwind-merge";
import { GlobalContextProvider } from "./contexts/globalContext";
import { CacheContextProvider } from "./contexts/cacheContext";
import SchemaPage from "./pages/SchemaPage/SchemaPage";
import TestSchemaPage from "./pages/TestSchemaPage/TestSchemaPage";
import loader from "@monaco-editor/loader";
import api, { setJwt } from "./helpers/api";
import { getTokenFromLocalStorage } from "./helpers/utils";
import Loader from "./common/Loader";
import LogoutPage from "./pages/LogoutPage/LogoutPage";
import ArtifactSettingsPage from "./pages/ArtifactSettingsPage/ArtifactSettingsPage";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="/test/schema" element={<TestSchemaPage />} />

        {/* Public Only Routes -> Authenticated users can not visit */}
        <Route
          path="/"
          element={<ProtectedRoute type={ProtectedTypes.PUBLICONLY} />}
        >
          <Route path="/auth" element={<AuthPage />} />
        </Route>

        {/* Private Only Routes -> Non Authenticated users can not visit */}
        <Route
          path="/"
          element={<ProtectedRoute type={ProtectedTypes.PRIVATEONLY} />}
        >
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/databases/:id" element={<DatabasePage />} />
          <Route path="/panel/:id" element={<PanelPage />} />
          <Route path="/collection/:id/schema" element={<SchemaPage />} />
          <Route
            path="/artifact/:id/settings"
            element={<ArtifactSettingsPage />}
          />
        </Route>
      </Route>
    )
  );

  return (
    <AuthLoader>
      <GlobalContextProvider>
        <CacheContextProvider>
          <RouterProvider router={router} />
        </CacheContextProvider>
      </GlobalContextProvider>
    </AuthLoader>
  );
}

function Root() {
  const modal = useModal();

  loader.init().then((monaco) => {
    monaco.editor.defineTheme("one-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        {
          token: "comment",
          foreground: "#338332",
          fontStyle: "italic",
        },
        {
          token: "bracket",
          foreground: "#0000ff",
        },
      ],
      colors: {
        "editor.background": "#000000",
      },
    });
  });

  return (
    <main className="relative">
      <article
        className={twMerge(
          "fixed z-[9999] to-0 left-0 w-full h-full bg-opacity-20 bg-background backdrop-blur-sm flex justify-center items-center duration-300",
          !modal.element && "opacity-0 pointer-events-none"
        )}
      >
        <div
          className={twMerge(
            "duration-inherit",
            !modal.element && "translate-y-[100vh] scale-0"
          )}
        >
          {modal.element}
        </div>
      </article>
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
}

function AuthLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const localToken = getTokenFromLocalStorage();
    if (localToken) setJwt(localToken);
    setLoading(false);
  }, []);

  return loading ? (
    <article className="flex justify-center items-center">
      <div className="w-28 h-28">
        <Loader />
      </div>
    </article>
  ) : (
    <>{children}</>
  );
}
