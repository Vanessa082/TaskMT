import { useEffect, useState } from "react";
import { useGetRequest } from "../../../providers/hooks/use-fetch";
import TaskCreationModal from "./TaskCreationModal"; // Import your Task Creation Modal component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTrash, faPen, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../../constants/constants";
import { toast } from "sonner";

export default function ManageTasks() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const { data, error, loading } = useGetRequest("/tasks");

  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

  const openModal = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setIsModalOpen(false);
  };

  const handleTaskSubmit = (newTask) => {
    setTasks((prevTasks) =>
      prevTasks.some((task) => task.task_id === newTask.task_id)
        ? prevTasks.map((task) =>
            task.task_id === newTask.task_id ? newTask : task
          )
        : [...prevTasks, newTask]
    );
  };

  const handleTaskCompletion = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.task_id === taskId ? { ...task, status: "Completed" } : task
        )
      );
      toast("Task marked as completed");
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    toast("Are you sure you want to delete this task?", {
      action: {
        label: "Delete Task",
        onClick: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
              method: "DELETE",
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
              },
            });

            if (response.ok) {
              setTasks((prevTasks) =>
                prevTasks.filter((task) => task.task_id !== taskId)
              );
              toast("Task deleted successfully");
            }
          } catch (error) {
            console.error("Error deleting task:", error);
          }
        },
      },
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-primary text-white px-4 py-2 rounded-md mb-4"
      >
        Create New Task
      </button>
      {loading && <p>Loading tasks...</p>}
      {error && <p>Error loading tasks: {error.message}</p>}
      {tasks.length === 0 && !loading && !error && <p>No tasks available.</p>}
      {tasks.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-2">Pending Tasks</h3>
          {tasks
            .filter((task) => task.status !== "Completed")
            .map((task) => (
              <div
                key={task.task_id}
                className="bg-gray-100 p-4 mb-2 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold">{task.name}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-600">Due: {task.due_date}</p>
                <div className="flex gap-2 mt-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500 cursor-pointer"
                    onClick={() => handleTaskCompletion(task.task_id)}
                  />
                  <FontAwesomeIcon
                    icon={faPen}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => openModal(task)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteTask(task.task_id)}
                  />
                </div>
              </div>
            ))}
          <h3 className="text-xl font-semibold mt-4 mb-2">Completed Tasks</h3>
          {tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <div
                key={task.task_id}
                className="bg-gray-200 p-4 mb-2 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold">{task.name}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-600">Due: {task.due_date}</p>
              </div>
            ))}
        </div>
      )}

      {isModalOpen && (
        <TaskCreationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleTaskSubmit}
          projects={[]} // Pass the list of projects if needed
        />
      )}
    </div>
  );
}
