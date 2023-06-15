import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type CacheType = { key: string; value: any; updated: number }[];

interface CacheContextType {
  data: CacheType;
  putCache: (key: string, value: any) => void;
}

const CacheContext = createContext<CacheContextType>({} as CacheContextType);

export function CacheContextProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CacheType>([]);
  const [loading, setLoading] = useState(true);

  function putCache(key: string, value: any) {
    let xCache = data;
    let flag = false;
    xCache.map((e) => {
      if (e.key === key) {
        e.value = value;
        e.updated = Date.now();
        flag = true;
      }
    });
    if (!flag) {
      xCache.push({ key: key, value: value, updated: Date.now() });
    }
    setData(xCache);
    saveLocalCache();
  }

  async function loadLocalCache() {
    const loadedCache = localStorage.getItem("cache");

    if (loadedCache) {
      const savedCache = await JSON.parse(loadedCache as string);
      setData(savedCache);
    } else {
      localStorage.setItem("cache", JSON.stringify(data));
    }

    setLoading(false);
  }

  async function saveLocalCache() {
    localStorage.setItem("cache", JSON.stringify(data));
  }

  useEffect(() => {
    loadLocalCache();
  }, []);

  const value = { data, putCache };

  return (
    <CacheContext.Provider value={value}>
      {!loading && children}
    </CacheContext.Provider>
  );
}

export default function useCache() {
  return useContext(CacheContext);
}
