import Login from "./components/Login";
import Register from "./components/Register";

export default function AuthPage() {
  return (
    <>
      <div className="flex justify-evenly">
        <Register />
        <Login />
      </div>
    </>
  );
}
