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
    setQuery: setTaskQuery,
  } = useQueryRequest("/tasks", { fetchOncall: false, initialData: [] });

  const taskCount = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  const projectCount = projects.length;

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
        setTaskQuery,

        taskCount,
        completedTasks,
        pendingTasks,
        projectCount,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

const useDashboardContext = () => useContext(DashboardContext);

export { useDashboardContext, DashboardContextProvider };
