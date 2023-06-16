import { useRef, useState } from "react";
import api from "../../../api";

export default function Login() {
  const userRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    api.login(userRef.current.value, passwordRef.current.value);
    setLoading(false);
  }

  return (
    <form
      className="flex flex-col m-8 gap-y-2 w-96 items-center"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="username"
        className="border-black border p-2 rounded-md"
        ref={userRef}
      />
      <input
        type="text"
        placeholder="password"
        className="border-black border p-2 rounded-md"
        ref={passwordRef}
      />
      <button
        className="w-max bg-black text-white rounded-md px-5 py-2 disabled:opacity-70"
        disabled={loading}
      >
        Login
      </button>
    </form>
  );
}
