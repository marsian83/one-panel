import axios from "axios";
import { serverUrl } from "../config";
import { clearTokenFromLocalStorage, saveTokenToLocalStorage } from "./utils";
import { Artifact, Collection, Database, Plan } from "../interfaces/Data";
import { Color } from "../assets/data/colors";
import { Icon } from "../assets/data/icons";

let jwt: string | null = null;

let client = createApi();

function createApi() {
  const client = axios.create({
    baseURL: serverUrl,
    timeout: 32000,
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
  });

  // Request Middleware
  client.interceptors.request.use(
    function (config) {
      // Config before Request
      return config;
    },
    function (err) {
      // If Request error
      console.error(err);
      return Promise.reject(err);
    }
  );

  // Response Middleware
  client.interceptors.response.use(
    function (res) {
      if (res.data.invalidToken) {
        api.logout();
      }
      return res;
    },
    function (error) {
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return client;
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
  client: client,

  async login(email: string, password: string) {
    const userData = (
      await client.post("/auth/login", JSON.stringify({ email, password }))
    ).data;

    if (userData.error) {
      throw new Error(userData.error);
    }

    if (userData.accessToken) {
      setJwt(userData.accessToken);
      saveTokenToLocalStorage(userData.accessToken);
      location.reload();
    }
  },

  async register(name: string, email: string, password: string) {
    const userData = (
      await client.post(
        "/auth/register",
        JSON.stringify({ name, email, password })
      )
    ).data;

    if (userData.error) {
      throw new Error(userData.error);
    }
  },

  async logout() {
    await client.delete("/auth/logout");
    clearTokenFromLocalStorage();
    clearJwt();
  },

  async getUserName() {
    if (!jwt) throw new Error("Unauthorized - getUserName");
    const user = (await client.get("/user/name")).data;

    return user.username;
  },

  async getDatabases() {
    if (!jwt) throw new Error("Unauthorized - getDatabases");

    const databases = (
      await client.get<{ databases: Database[] }>("/user/databases")
    ).data.databases;

    return databases;
  },

  async getDatabase(dbId: number) {
    if (!jwt) throw new Error("Unauthorized - getDatabases");
    const database = (
      await client.get<{ database: Database }>(`/database/${dbId}`)
    ).data.database;

    return database;
  },

  async newDatabase(
    name: string,
    plan: Plan,
    icon: { codepoint?: Icon; imageUrl?: string }
  ) {
    if (!jwt) throw new Error("Unauthorized - newDatabase");
    const response = (
      await client.post("/database/new", JSON.stringify({ name, plan, icon }))
    ).data;

    return response;
  },

  async newArtifact(
    dbId: number,
    name: string,
    color: Color,
    icon: { codepoint: Icon }
  ) {
    if (!jwt) throw new Error("Unauthorized - newDatabase");
    const response = (
      await client.post(
        `/database/${dbId}/artifact`,
        JSON.stringify({ name, color, icon })
      )
    ).data;

    return response;
  },

  async isBasicAllowed() {
    if (!jwt) throw new Error("Unauthorized");
    const allowed = (await client.get("/user/basicdb-isallowed")).data.allowed;

    return allowed;
  },

  async getArtifact(id: number) {
    if (!jwt) throw new Error("Unauthorized - getArtifacts");

    const artifact = (
      await client.get<{ artifact: Artifact & { collections: Collection[] } }>(
        `/artifact/${id}`
      )
    ).data.artifact;

    return artifact;
  },

  async newCollection(artifactId: number, name: string) {
    if (!jwt) throw new Error("Unauthorized - newCollection");

    const response = (
      await client.post<{ message: string; collection: Collection }>(
        `/artifact/${artifactId}/collection`,
        JSON.stringify({ name })
      )
    ).data;

    return response;
  },

  async getCollection(id: number) {
    if (!jwt) throw new Error("Unauthorized - newCollection");

    const collection = (
      await client.get<{ collection: Collection }>(`/collection/${id}`)
    ).data.collection;

    return collection;
  },

  async updateCollection(id: number, data: { name?: string; schema?: string }) {
    if (!jwt) throw new Error("Unauthorized - newCollection");

    const response = (
      await client.put<{ message: string; collection: Collection }>(
        `/collection/${id}`,
        JSON.stringify({ ...data })
      )
    ).data;

    return response;
  },
};

export default api;
