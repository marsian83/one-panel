import { useEffect } from "react";
import api from "../../helpers/api";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  const navigate = useNavigate();

  async function logout() {
    await api.logout();
    navigate("/");
  }

  useEffect(() => {
    logout();
  });

  return (
    <div className="flex h-screen text-xl justify-center items-center">
      Logging out
    </div>
  );
}
