import { createContext, useContext, useState } from "react";
import TaskCreationModal from "../../Pages/dashboard/task/add-task-modal";
import ProjectDetailsModal from "../../Pages/dashboard/projects/project-details-modal";
import ViewTaskModal from "../../Pages/dashboard/task/view-task";

const ModalContext = createContext([]);

function ModalContextProvider({ children }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "",
    start_time: "",
    deadline: "",
    status: "",
    project_id: "",
    time_estimate: "",
    is_recurring: false,
    recurrence_pattern: "",
  });

  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskViewModalOpen, setViewTaskModalOpen] = useState(false);

  const [project, setProject] = useState({
    name: "",
    deadline: "",
    description: "",
    status: "",
  });

  const [projectModalOpen, setProjectModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        taskModalOpen,
        setTaskModalOpen,

        taskViewModalOpen,
        setViewTaskModalOpen,

        task,
        setTask,

        projectModalOpen,
        setProjectModalOpen,

        project,
        setProject,
      }}
    >
      {taskModalOpen && <TaskCreationModal />}
      {taskViewModalOpen && <ViewTaskModal />}
      {projectModalOpen && <ProjectDetailsModal />}

      {children}
    </ModalContext.Provider>
  );
}

const useModalContext = () => useContext(ModalContext);

export { useModalContext, ModalContextProvider };
