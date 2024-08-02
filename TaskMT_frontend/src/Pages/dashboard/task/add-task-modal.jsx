import { useState, useRef, useEffect } from "react";
import { API_BASE_URL } from "../../../constants/constants";

export default function TaskCreationModal({ isOpen, onClose, onSubmit, projects }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [priority, setPriority] = useState("Low");
  const [selectedProject, setSelectedProject] = useState("");

  const modalRef = useRef(null);

  const handleTaskNameChange = (e) => setTaskName(e.target.value);
  const handleTaskDescriptionChange = (e) => setTaskDescription(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleProjectChange = (e) => setSelectedProject(e.target.value);

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
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: taskName,
          description: taskDescription,
          due_date: dueDate,
          priority,
          project_id: selectedProject,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
      
      const data = await response.json();
      console.log("Task created successfully:", data);
      onSubmit(data); // Notify parent component
      onClose(); // Close modal on successful submission
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div ref={modalRef} className="bg-white p-4 rounded-lg shadow-lg w-96">
        <span className="close cursor-pointer text-right" onClick={onClose}>
          &times;
        </span>
        <h2 className="text-lg font-bold mb-4">Create Task</h2>
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
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
