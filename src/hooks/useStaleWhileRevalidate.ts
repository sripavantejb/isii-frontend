import { useEffect, useRef, useState } from "react";

interface UseStaleWhileRevalidateOptions<T> {
  storageKey: string;
  fetcher: () => Promise<T>;
  initialData: T;
}

interface UseStaleWhileRevalidateResult<T> {
  data: T;
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  hasCachedData: boolean;
}

const readCachedValue = <T,>(storageKey: string): T | null => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.localStorage.getItem(storageKey);
    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as T;
  } catch (error) {
    console.error(`Failed to read cached data for ${storageKey}:`, error);
    window.localStorage.removeItem(storageKey);
    return null;
  }
};

const writeCachedValue = <T,>(storageKey: string, value: T) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to cache data for ${storageKey}:`, error);
  }
};

export const useStaleWhileRevalidate = <T,>({
  storageKey,
  fetcher,
  initialData,
}: UseStaleWhileRevalidateOptions<T>): UseStaleWhileRevalidateResult<T> => {
  const cachedValueRef = useRef<T | null>(readCachedValue<T>(storageKey));
  const fetcherRef = useRef(fetcher);
  const [data, setData] = useState<T>(() => cachedValueRef.current ?? initialData);
  const [hasCachedData, setHasCachedData] = useState(() => cachedValueRef.current !== null);
  const [isLoading, setIsLoading] = useState(() => cachedValueRef.current === null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  fetcherRef.current = fetcher;

  useEffect(() => {
    let isMounted = true;

    const refreshData = async () => {
      setIsRefreshing(true);

      try {
        const freshData = await fetcherRef.current();

        if (!isMounted) {
          return;
        }

        setData(freshData);
        setHasCachedData(true);
        setError(null);
        writeCachedValue(storageKey, freshData);
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }

        setError(fetchError instanceof Error ? fetchError : new Error("Failed to load data"));
      } finally {
        if (!isMounted) {
          return;
        }

        setIsLoading(false);
        setIsRefreshing(false);
      }
    };

    refreshData();

    return () => {
      isMounted = false;
    };
  }, [storageKey]);

  return { data, isLoading, isRefreshing, error, hasCachedData };
};
