import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/constants";

/**
 * Queries are methods without a body (like GET, DELETE, HEAD)
 * while mutations are those that have a body (like POST, PUT, PATCH)
 * @argument pathname the api pathname to hit
 * @argument options object to controll how hook works, properties below
 * * fetchOnCall: Boolean // option wether or not to make request as soon as hook is called. true by default
*/
function useQueryRequest(pathname, { fetchOnCall = true, initialData = null } = {}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  const [isFirstFetch, setIsFirstFetch] = useState(true);

  const refetch = () => {
    setIsFirstFetch(false);
    setReload((prev) => !prev);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${pathname}`, {
        method: "GET",
        headers: {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network Response was not ok");
      }

      const _data = await response.json();
      setData(_data);
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!fetchOnCall && isFirstFetch) {
      return;
    };

    fetchData();
  }, [reload]);

  return { data, setData, loading, error, refetch };
};

export { useQueryRequest };
