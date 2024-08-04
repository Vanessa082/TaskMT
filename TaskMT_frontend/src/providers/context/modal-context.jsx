import { createContext, useContext, useState } from "react";
import TaskCreationModal from "../../Pages/dashboard/task/add-task-modal";

const ModalContext = createContext(null);

function ModalContextProvider ({ children })  {
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: "",
    project_id: "",
    time_estimate: "",
    is_recurring: "",
    recurrence_pattern: "",
  });
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        taskModalOpen,
        setTaskModalOpen,

        task, setTask,
      }}
    >
      {taskModalOpen && <TaskCreationModal />}

      {children}
    </ModalContext.Provider>
  );
};

const useModalContext = () => useContext(ModalContext);

export { useModalContext, ModalContextProvider };
