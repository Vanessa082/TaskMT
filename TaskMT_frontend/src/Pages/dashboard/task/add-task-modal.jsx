import { useState, useRef, useEffect } from "react";
import { API_BASE_URL } from "../../../constants/constants";
import { useModalContext } from "../../../providers/context/modal-context";

export default function TaskCreationModal({ isOpen, closeModal, projects }) {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const { task, setTask, setTaskModalOpen } = useModalContext();

  const updateTaskState = (key, value) => {
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const modalRef = useRef(null);

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const url = `${API_BASE_URL}/tasks/${isEditing ? task.task_id : ""}`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          ...task,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit the task");
      }

      const result = await response.json();
      onSubmit(result);
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);

    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, [closeModal]);

  useEffect(() => {
    if (task && task.task_id) setIsEditing(true);
    else setIsEditing(false);
  }, [task]);

  if (!isOpen) return null;

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"></div> */}

      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
        <div ref={modalRef} className="bg-white p-4 rounded-lg shadow-lg w-96">
          <span
            className="close cursor-pointer text-right"
            onClick={closeModal}
          >
            &times;
          </span>
          <h2 className="text-lg font-bold mb-4">
            {initialData.task_id ? "Update Task" : "Create Task"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <label>
              Task Name
              <input
                type="text"
                value={task.title}
                onChange={(e) => updateTaskState("title", e.target.value)}
                required
                className="border border-gray-300 p-2 rounded mt-1"
              />
            </label>
            <label className="mt-2">
              Description
              <textarea
                value={task.description}
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
                value={task.deadline}
                onChange={(e) => updateTaskState("deadline", e.target.value)}
                className="border border-gray-300 p-2 rounded mt-1"
                required
              />
            </label>
            <label className="mt-2">
              Priority
              <select
                value={task.priority}
                onChange={(e) => updateTaskState("priority", e.target.value)}
                className="border border-gray-300 p-2 rounded mt-1"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
            <label className="mt-2">
              Project
              <select
                value={task.project_id}
                onChange={(e) => updateTaskState("project_id", e.target.value)}
                className="border border-gray-300 p-2 rounded mt-1"
                required
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project.project_id} value={project.project_id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="mt-2">
              Time Estimate
              <input
                type="text"
                value={task.time_estimate}
                onChange={(e) =>
                  updateTaskState("time_estimate", e.target.value)
                }
                placeholder="e.g., 2 hours, 3 days"
                className="border border-gray-300 p-2 rounded mt-1"
              />
            </label>
            <label className="mt-2 flex items-center">
              Recurring Task
              <input
                type="checkbox"
                value={task.is_recurring}
                onChange={(e) =>
                  updateTaskState("is_recurring", e.target.checked)
                }
                className="ml-2"
              />
            </label>

            {isRecurring && (
              <label className="mt-2">
                Recurrence Pattern
                <input
                  type="text"
                  value={task.recurrence_pattern}
                  onChange={(e) =>
                    updateTaskState("recurrence_pattern", e.target.value)
                  }
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
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded"
              >
                {isEditing ? "Update Task" : "Create Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
