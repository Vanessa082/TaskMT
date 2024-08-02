import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../../constants/constants";

export default function ProjectDetailsModal({ initialData = {}, onClose, onSubmit, mode = 'create' }) {
  const [projectDescription, setProjectDescription] = useState(initialData.description || "");
  const [projectName, setProjectName] = useState(initialData.name || "");
  const [projectDeadline, setProjectDeadline] = useState(initialData.deadline || new Date().toISOString().split("T")[0]);
  const [projectStatus, setProjectStatus] = useState(initialData.status || "active");

  const modalRef = useRef(null);

  const handleProjectDescription = (e) => setProjectDescription(e.target.value);
  const handleProjectName = (e) => setProjectName(e.target.value);
  const handleProjectDeadline = (e) => setProjectDeadline(e.target.value);
  const handleProjectStatus = (e) => setProjectStatus(e.target.value);

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
  }, [onClose]);

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    try {
      // Determine the method to be used
      const url = mode === 'edit' ? `${API_BASE_URL}/projects/${initialData.project_id}` : `${API_BASE_URL}/projects`;
      const method = mode === 'edit' ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name: projectName,
          description: projectDescription,
          deadline: projectDeadline,
          status: projectStatus,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
      const data = await response.json();
      console.log("Project added/updated successfully:", data);
      onSubmit(data);
      onClose(); // Close the modal on successful submission
    } catch (error) {
      console.error("Error adding/updating project:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div ref={modalRef} className="bg-white p-4 rounded flex flex-col">
        <span className="close cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <form className="flex flex-col" onSubmit={handleSubmitProject}>
          <label>Project Name</label>
          <input type="text" value={projectName} onChange={handleProjectName} required />

          <label>Project Deadline</label>
          <input type="date" value={projectDeadline} onChange={handleProjectDeadline} required />

          <label>Status</label>
          <select value={projectStatus} onChange={handleProjectStatus} required>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <label className="flex flex-col">
            Project Description
            <textarea
              value={projectDescription}
              onChange={handleProjectDescription}
              rows={6}
              cols={60}
              placeholder="Provide a detailed description of the project, including goals, objectives ..."
              required
            />
          </label>
          
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary-dark transition-colors">
            {mode === 'edit' ? 'Save Changes' : 'Create Project'}
          </button>
        </form>
      </div>
    </div>
  );
}
