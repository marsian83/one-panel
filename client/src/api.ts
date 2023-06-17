import axios from "axios";
import { serverUrl } from "./config";
import { clearTokenFromLocalStorage, saveTokenToLocalStorage } from "./utils";

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

export function clearJwt() {
  jwt = null;
  client.defaults.headers["Authorization"] = null;
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

    if (userData.accessToken) {
      setJwt(userData.accessToken);
      saveTokenToLocalStorage(userData.accessToken);
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

    if (userData.accessToken) {
      setJwt(userData.accessToken);
      saveTokenToLocalStorage(userData.accessToken);
    }
  },

  logout() {
    clearTokenFromLocalStorage();
    clearJwt();
    client.delete("/auth/logout");
    window.location.reload();
  },

  async validateToken(token: string) {
    const valid = (
      await client.get("/auth/validate", {
        params: {
          token: token,
        },
      })
    ).data.valid;
    return valid || false;
  },

  getUserName() {},
};

export default api;
