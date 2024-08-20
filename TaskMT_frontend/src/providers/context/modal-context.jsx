import { createContext, useContext, useState } from "react";
import TaskCreationModal from "../../Pages/dashboard/task/add-task-modal";
import ProjectDetailsModal from "../../Pages/dashboard/projects/project-details-modal";

const ModalContext = createContext([]);

function ModalContextProvider({ children }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "",
    deadline: "",
    status: "",
    project_id: "",
    time_estimate: "",
    is_recurring: "",
    recurrence_pattern: "",
  });
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  const [project, setProject] = useState({
    name: "",
    deadline: "",
    description: "",
    status: "",
  });

  /**
   * callback to call when project modal is done executing
  */
  const [onProjectModalDone, setOnProjectModalDone] = useState(null);

  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        taskModalOpen,
        setTaskModalOpen,

        task,
        setTask,

        projectModalOpen,
        setProjectModalOpen,

        project,
        setProject,

        onProjectModalDone,
        setOnProjectModalDone,
      }}
    >
      {taskModalOpen && <TaskCreationModal />}
      {projectModalOpen && <ProjectDetailsModal />}

      {children}
    </ModalContext.Provider>
  );
}

const useModalContext = () => useContext(ModalContext);

export { useModalContext, ModalContextProvider };
