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
import { getTokenFromLocalStorage } from "./utils";
import api, { clearJwt, setJwt } from "./api";
import ProtectedRoute, { ProtectedTypes } from "./common/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import DatabasePage from "./pages/DatabasePage/DatabasePage";
import PanelPage from "./pages/PanelPage/PanelPage";
import useModal from "./hooks/useModal";
import { twMerge } from "tailwind-merge";
import { GlobalContextProvider } from "./contexts/globalContext";
import { CacheContextProvider } from "./contexts/cacheContext";

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />

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
          // element={<ProtectedRoute type={ProtectedTypes.PRIVATEONLY} />}
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/databases/:id" element={<DatabasePage />} />
          <Route path="/panel/:id" element={<PanelPage />} />
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
  useEffect(() => {
    checkAndValidateLocalToken();
  }, [useLocation()]);

  const modal = useModal();

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

async function checkAndValidateLocalToken() {
  const token = getTokenFromLocalStorage();
  if (token) {
    if (await api.validateToken(token)) {
      return setJwt(token);
    }
    clearJwt();
  }
}

function AuthLoader({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAndValidateLocalToken().then(() => {
      setLoading(false);
    });
  }, []);

  return <>{loading ? <p>loading...</p> : children}</>;
}
