import { useEffect, useState } from "react";

function useGetRequest(pathname) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);

    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${pathname}`, {
          method: "GET",
          header: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    fetchProjects();
  }, []);

  return { loading, data, error };
};

export { useGetRequest };
