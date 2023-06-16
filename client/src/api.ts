import axios from "axios";
import { serverUrl } from "./config";

let jwt: string | null = null;

let api = createApi();

function createApi() {
  return axios.create({
    baseURL: serverUrl,
    timeout: 5000,
    headers: {
      Authorization: jwt,
      "Content-Type": "application/json",
    },
  });
}

export function setJwt(token: string) {
  jwt = token;
  api = createApi();
}

export default api;
