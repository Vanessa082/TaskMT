import { createContext, useContext } from "react";
import { useQueryRequest } from "../hooks/use-query-request";

const DashboardContext = createContext(null);

function DashboardContextProvider({ children }) {
  const {
    data: projects,
    setData: setProjects,
    refetch: refetchProjects,
    error: projectsError,
    loading: projectsLoading,
  } = useQueryRequest("/projects",
    {
      initialData: [],
    }
  );

  const {
    data: tasks,
    setData: setTasks,
    refetch: refetchTasks,
    error: tasksError,
    loading: tasksLoading,
  } = useQueryRequest("/tasks", { fetchOncall: false, initialData: [] });

  return (
    <DashboardContext.Provider
      value={{
        projects,
        setProjects,
        refetchProjects,
        projectsLoading,
        projectsError,

        tasks,
        setTasks,
        refetchTasks,
        tasksLoading,
        tasksError,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

const useDashboardContext = () => useContext(DashboardContext);

export { useDashboardContext, DashboardContextProvider };
