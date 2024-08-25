import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit, faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../constants/constants";

export default function ProjectPage({ match }) {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const projectId = match.params.id; // Assuming you're using React Router for routing

  // Fetch project details and tasks
  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const projectData = await response.json();
        setProject(projectData);

        const tasksResponse = await fetch(`${API_BASE_URL}/tasks?project_id=${projectId}`, {
          method: "GET",
          headers: {
            "Content-Type": "Application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const tasksData = await tasksResponse.json();
        setTasks(tasksData.filter(task => !task.is_completed));
        setCompletedTasks(tasksData.filter(task => task.is_completed));
      } catch (error) {
        console.error("Error fetching project or tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectAndTasks();
  }, [projectId]);

  const markTaskAsComplete = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
        setCompletedTasks([...completedTasks, { ...tasks.find(task => task.id === taskId), is_completed: true }]);
      }
    } catch (error) {
      console.error("Error marking task as complete:", error);
    }
  };

  const markProjectAsComplete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}/complete`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        alert("Project marked as completed!");
      }
    } catch (error) {
      console.error("Error marking project as complete:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
        setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = (task) => {
    // Handle task update here
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{project?.name}</h1>
      <p>{project?.description}</p>
      <p>Deadline: {new Date(project?.deadline).toLocaleDateString()}</p>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={markProjectAsComplete}
      >
        Mark Project as Complete
      </button>
      <h2 className="text-xl mt-4">Tasks</h2>
      <div>
        {tasks.length === 0 ? <p>No tasks left.</p> : (
          <ul>
            {tasks.map(task => (
              <li key={task.id} className="flex justify-between items-center p-2 border-b">
                <span>{task.name}</span>
                <div className="flex gap-2">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-green-500 cursor-pointer"
                    onClick={() => markTaskAsComplete(task.id)}
                  />
                  <FontAwesomeIcon
                    icon={faEdit}
                    className="text-blue-500 cursor-pointer"
                    onClick={() => handleUpdateTask(task)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    className="text-red-500 cursor-pointer"
                    onClick={() => handleDeleteTask(task.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h2 className="text-xl mt-4">Completed Tasks</h2>
      <div>
        {completedTasks.length === 0 ? <p>No completed tasks.</p> : (
          <ul>
            {completedTasks.map(task => (
              <li key={task.id} className="flex justify-between items-center p-2 border-b">
                <span>{task.name}</span>
                <FontAwesomeIcon icon={faCircle} className="text-gray-500" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
