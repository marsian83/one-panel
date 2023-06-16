import axios from "axios";
import { serverUrl } from "./config";

let jwt: string | null = null;

let client = createApi();

function createApi() {
  return axios.create({
    baseURL: serverUrl,
    timeout: 5000,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });
}

export function setJwt(token: string) {
  jwt = token;
  client.defaults.headers["Authorization"] = `Bearer ${jwt}`;
}

const api = {
  async login(username: string, password: string) {
    const userData = (
      await client.post(
        "/auth/login",
        JSON.stringify({
          username: username,
          password: password,
        })
      )
    ).data;

    if (userData.error) {
      throw new Error(userData.error);
    }

    console.log(userData);
    console.log(client.defaults.headers);

    if (userData.accessToken) {
      setJwt(userData.accessToken);
    }
  },
  async register(username: string, email: string, password: string) {
    const userData = (
      await client.post(
        "/auth/register",
        JSON.stringify({
          username: username,
          email: email,
          password: password,
        })
      )
    ).data;

    if (userData.error) {
      throw new Error(userData.error);
    }

    console.log(userData);
  },
  logout() {},
  getUserName() {},
};

export default api;
