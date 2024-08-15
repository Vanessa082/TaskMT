import { useEffect, useState } from "react";
import { API_BASE_URL } from "../../constants/constants";

/**
 * Queries are methods without a body (like GET, DELETE, HEAD)
 * while mutations are those that have a body (like POST, PUT, PATCH)
*/
function useQueryRequest(pathname) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(false);

  const refetch = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    setLoading(true);

    const fetchProjects = async () => {
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
        console.log(data, 'fetched')
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [reload]);

  return { loading, data, error, refetch };
};

export { useQueryRequest };
