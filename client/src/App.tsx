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
import { useEffect } from "react";
import { getTokenFromLocalStorage } from "./utils";
import api, { clearJwt, setJwt } from "./api";
import ProtectedRoute from "./common/ProtectedRoute";
import DatabasesPage from "./pages/DatabasesPage/DatabasesPage";

export default async function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DatabasesPage />} />
        </Route>
      </Route>
    )
  );

  await checkAndValidateLocalToken();

  return <RouterProvider router={router} />;
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
