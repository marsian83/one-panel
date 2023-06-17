import { Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import api from "../../api";

export default function AuthPage() {
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
        <button
          onClick={async () => {
            await api.logout();
          }}
          className="bg-black px-4 py-1 rounded-md text-white"
        >
          Logout
        </button>
      </div>
    </>
  );
}
