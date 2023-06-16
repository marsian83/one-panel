import axios from "axios";
import { serverUrl } from "./config";

let jwt: string | null = null;

let client = createApi();

function createApi() {
  return axios.create({
    baseURL: serverUrl,
    timeout: 5000,
    headers: {
      Authorization: jwt,
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export function setJwt(token: string) {
  jwt = token;
  client = createApi();
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
  },
  register() {},
  logout() {},
  getUserName() {},
};

export default api;
