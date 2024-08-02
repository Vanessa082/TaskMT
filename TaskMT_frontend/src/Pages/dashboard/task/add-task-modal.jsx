import { useState, useRef, useEffect } from "react";
import { API_BASE_URL } from "../../../constants/constants";

export default function TaskCreationModal({ isOpen, onClose, onSubmit, projects, initialData = {} }) {
  const [taskName, setTaskName] = useState(initialData.title || "");
  const [taskDescription, setTaskDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(initialData.deadline || new Date().toISOString().split("T")[0]);
  const [priority, setPriority] = useState(initialData.priority || "Low");
  const [selectedProject, setSelectedProject] = useState(initialData.project_id || "");
  const [timeEstimate, setTimeEstimate] = useState(initialData.time_estimate || "");
  const [isRecurring, setIsRecurring] = useState(initialData.is_recurring || false);
  const [recurrencePattern, setRecurrencePattern] = useState(initialData.recurrence_pattern || "");

  const modalRef = useRef(null);

  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleTaskDescriptionChange = (e) => setTaskDescription(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleProjectChange = (e) => setSelectedProject(e.target.value);
  const handleTimeEstimateChange = (e) => setTimeEstimate(e.target.value);
  const handleIsRecurringChange = (e) => setIsRecurring(e.target.checked);
  const handleRecurrencePatternChange = (e) => setRecurrencePattern(e.target.value);

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleCloseModal);
    return () => {
      document.removeEventListener("mousedown", handleCloseModal);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/tasks${initialData.task_id ? `/${initialData.task_id}` : ""}`, {
        method: initialData.task_id ? 'PUT' : 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title: taskName,
          description: taskDescription,
          priority,
          deadline: dueDate,
          project_id: selectedProject,
          time_estimate: timeEstimate,
          is_recurring: isRecurring,
          recurrence_pattern: recurrencePattern
        })
      });

      if (!response.ok) {
        throw new Error("Failed to submit the task");
      }

      const result = await response.json();
      onSubmit(result);
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div ref={modalRef} className="bg-white p-4 rounded-lg shadow-lg w-96">
        <span className="close cursor-pointer text-right" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-lg font-bold mb-4">{initialData.task_id ? "Update Task" : "Create Task"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>
            Task Name
            <input
              type="text"
              value={taskName}
              onChange={handleTaskNameChange}
              required
              className="border border-gray-300 p-2 rounded mt-1"
            />
          </label>
          <label className="mt-2">
            Description
            <textarea
              value={taskDescription}
              onChange={handleTaskDescriptionChange}
              rows="4"
              className="border border-gray-300 p-2 rounded mt-1"
              required
            />
          </label>
          <label className="mt-2">
            Due Date
            <input
              type="date"
              value={dueDate}
              onChange={handleDueDateChange}
              className="border border-gray-300 p-2 rounded mt-1"
              required
            />
          </label>
          <label className="mt-2">
            Priority
            <select
              value={priority}
              onChange={handlePriorityChange}
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
              value={selectedProject}
              onChange={handleProjectChange}
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
              value={timeEstimate}
              onChange={handleTimeEstimateChange}
              placeholder="e.g., 2 hours, 3 days"
              className="border border-gray-300 p-2 rounded mt-1"
            />
          </label>
          <label className="mt-2 flex items-center">
            Recurring Task
            <input
              type="checkbox"
              checked={isRecurring}
              onChange={handleIsRecurringChange}
              className="ml-2"
            />
          </label>
          {isRecurring && (
            <label className="mt-2">
              Recurrence Pattern
              <input
                type="text"
                value={recurrencePattern}
                onChange={handleRecurrencePatternChange}
                placeholder="e.g., every Monday"
                className="border border-gray-300 p-2 rounded mt-1"
              />
            </label>
          )}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              {initialData.task_id ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
