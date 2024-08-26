import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../constants/constants";
import { useModalContext } from "../../../providers/context/modal-context";
import { useDashboardContext } from "../../../providers/context/dashboard-context";
import { toast } from "sonner";

export default function TaskCreationModal() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { task, setTask, setTaskModalOpen } = useModalContext();
  const { projects, refetchTasks} = useDashboardContext();
 
  const updateTaskState = (key, value) => {
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const closeModal = async() => {
    await refetchTasks()
    setTask(null);
    setTaskModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ttttttttt", task);
    try {
      setLoading(true);

      const url = `${API_BASE_URL}/tasks/${isEditing ? task.task_id : ""}`;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(task),
      });
      console.log("Response status:", response.status);


      const result = await response.json();
      console.log("Result:", result);
      toast.success(`Task ${isEditing ? "updated" : "created"} successfully.`, "success");
      closeModal();
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (task && task.task_id) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [task]);

  return (
    <>
      <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50" onClick={closeModal} />

      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-lg shadow-lg w-96">
        <span className="close cursor-pointer text-right" onClick={closeModal}>
          &times;
        </span>

        <h2 className="text-lg font-bold mb-4">
          {isEditing ? "Update Task" : "Create Task"}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>
            Task Name
            <input
              type="text"
              value={task?.name || ""}
              onChange={(e) => updateTaskState("name", e.target.value)}
              required
              className="border border-gray-300 p-2 rounded mt-1"
            />
          </label>
          <label className="mt-2">
            Description
            <textarea
              value={task?.description || ""}
              onChange={(e) => updateTaskState("description", e.target.value)}
              rows="4"
              className="border border-gray-300 p-2 rounded mt-1"
              required
            />
          </label>
          <label className="mt-2">
            Deadline Date
            <input
              type="date"
              value={task?.deadline || ""}
              onChange={(e) => updateTaskState("deadline", e.target.value)}
              className="border border-gray-300 p-2 rounded mt-1"
              required
            />
          </label>

          <div className="flex">
            <label className="mt-2">
              Priority
              <select
                value={task?.priority || ""}
                onChange={(e) => updateTaskState("priority", e.target.value)}
                className="border border-gray-300 p-2 rounded mt-1"
              >
                <option value="" disabled>Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label className="mt-2">
              Status
              <select
                value={task?.status || ""}
                onChange={(e) => updateTaskState("status", e.target.value)}
                className="border border-gray-300 p-2 rounded mt-1"
              >
                <option value="" disabled>Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>

              </select>
            </label>
          </div>
          <label className="mt-2">
            Project
            <select
              value={task?.project_id || ""}
              onChange={(e) => updateTaskState("project_id", e.target.value)}
              className="border border-gray-300 p-2 rounded mt-1"
            >
              <option value="">Select a project</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-2">
            Time Estimate
            <input
              type="text"
              value={task?.time_estimate || ""}
              onChange={(e) => updateTaskState("time_estimate", e.target.value)}
              placeholder="e.g., 2 hours, 3 days"
              className="border border-gray-300 p-2 rounded mt-1"
            />
          </label>
          <label className="mt-2 flex items-center">
            Recurring Task
            <input
              type="checkbox"
              checked={task?.is_recurring || false}
              onChange={(e) => updateTaskState("is_recurring", e.target.checked)}
              className="ml-2"
            />
          </label>

          {task?.is_recurring && (
            <label className="mt-2">
              Recurrence Pattern
              <input
                type="text"
                value={task?.recurrence_pattern || ""}
                onChange={(e) => updateTaskState("recurrence_pattern", e.target.value)}
                placeholder="e.g., every Monday"
                className="border border-gray-300 p-2 rounded mt-1"
              />
            </label>
          )}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-300 text-black px-4 py-2 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Submitting..." : isEditing ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
