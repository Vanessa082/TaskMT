import { createContext, useEffect, useState, useContext } from "react";
import { fetchProjects } from "./api";

const DashboardContext = createContext(null);

function DashboardContextProvider({ children }) {
  const [projects, setProjects] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then((response) => {
        setProjects(response)
      })
      .catch((error) => {
        setError(error.message)
      })
      .finally(() => {
        setLoading(false)
      });
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        projects,
        setProjects,
        error,
        setError,
        loading,
        setLoading,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

const useDashboardContext = () => useContext(DashboardContext);

export { useDashboardContext, DashboardContextProvider };
