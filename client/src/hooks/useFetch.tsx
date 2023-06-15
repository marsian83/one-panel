import { useEffect, useState } from "react";
import { defaultCacheTimeout } from "../config";
import axios from "axios";
import useCache from "../contexts/cacheContext";

export default function useFetch<T>(
  url: string,
  options?: {
    cacheTimeout?: number;
    initial?: T;
    callback?: Function;
    debug?: boolean;
  }
) {
  const [data, setData] = useState<T | null>(
    options && options.initial ? options.initial : null
  );
  const [loading, setLoading] = useState<boolean>(true);

  const cache = useCache();

  async function loadData() {
    setLoading(true);

    const cachedValue = cache.data.filter((e) => e.key === url)[0];

    if (
      (cachedValue &&
        Date.now() - cachedValue.updated <
          (options && options.cacheTimeout
            ? options.cacheTimeout
            : defaultCacheTimeout)) ||
      (options && options.debug && import.meta.env.MODE === "development")
    ) {
      setData(cachedValue.value);
      setLoading(false);
      return;
    }

    const fetchedData = await axios.get(url);

    cache.putCache(url, fetchedData.data);

    setData(fetchedData.data);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (!loading && options && options.callback) {
      options.callback();
    }
  }, [loading]);

  return [data as T, loading as boolean] as const;
}
