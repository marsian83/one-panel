import { useEffect, useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

export default function DatabasesPage() {
  const [username, setUsername] = useState("");

  async function loadUserName() {
    const response = await api.getUserName();
    setUsername(response);
  }

  useEffect(() => {
    loadUserName();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <p>welcome {username}</p>
      <div className="flex gap-x-5">
        <button className="bg-green-700 px-4 py-1 rounded-md text-white">
          New DB
        </button>
        <button
          onClick={async () => {
            await api.logout();
            navigate(0);
          }}
          className="bg-black px-4 py-1 rounded-md text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
