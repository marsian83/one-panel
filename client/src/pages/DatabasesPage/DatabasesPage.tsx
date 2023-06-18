import { useEffect, useState } from "react";
import api from "../../api";

export default function DatabasesPage() {
  // const [username, setUsername] = useState("");

  // async function loadUserName() {
  //   const response = await api.getUserName();
  //   setUsername(response);
  // }

  // useEffect(() => {
  //   // loadUserName();
  // }, []);

  return (
    <div>
      {/* <p>welcome {username}</p> */}

      <button className="bg-green-700 px-4 py-1 rounded-md text-white">
        New DB
      </button>
    </div>
  );
}
