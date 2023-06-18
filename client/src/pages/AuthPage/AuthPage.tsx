import { Link, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import api from "../../api";

export default function AuthPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-evenly">
        <Register />
        <Login />
      </div>
      <div className="flex justify-center gap-x-8">
        <Link to="/" className="bg-black px-4 py-1 rounded-md text-white">
          back
        </Link>
      </div>
    </>
  );
}
