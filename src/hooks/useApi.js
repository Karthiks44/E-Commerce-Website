import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function useApi(url, defaultValue = []) {
  const [data, setData] = useState(defaultValue);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
      setError(null);
    } catch (e) {
      setError(e);
      setData(null);
    }
    setLoading(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    loading
  };
}

export default useApi;
