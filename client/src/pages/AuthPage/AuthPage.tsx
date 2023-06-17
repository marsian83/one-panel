import { Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

export default function AuthPage() {
  return (
    <>
      <div className="flex justify-evenly">
        <Register />
        <Login />
      </div>
      <Link to="/" className="bg-black px-4 py-1 rounded-md text-white">
        back
      </Link>
    </>
  );
}
