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
import DatabasesPage from "./pages/DatabasesPage/DatabasesPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";

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
        </Route>
      </Route>,
    ),
  );

  return (
    <AuthLoader>
      <RouterProvider router={router} />
    </AuthLoader>
  );
}

function Root() {
  useEffect(() => {
    checkAndValidateLocalToken();
  }, [useLocation()]);

  return (
    <main className="relative">
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
