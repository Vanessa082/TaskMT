import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../constants/constants";
import { useModalContext } from "../../../providers/context/modal-context";
import { toast } from "sonner";

export default function ProjectDetailsModal() {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    project,
    setProject,
    setProjectModalOpen,
    
    onProjectModalDone,
  } = useModalContext();

  const updateProjectState = (key, value) => {
    setProject((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const closeModal = async () => {
    if (onProjectModalDone) await onProjectModalDone();
    setProject(null);
    setProjectModalOpen(false);
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const url = `${API_BASE_URL}/projects/${isEditing ? project.project_id : ""}`;
      const method = isEditing ? "PUT" : "POST";
      
      const update = {
        deadline: project.deadline,
        description: project.description,
        name: project.name,
        status: project.status,
      }

      // console.log({ update });
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(update),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error("Failed to edit/create project");
        throw new Error(errorData?.message || "Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      toast.success(
        `Project ${isEditing ? "updated" : "created"} successfully.`
      );
      closeModal();
    } catch (error) {
      console.error("Error adding/updating project:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (project && project.project_id) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [project]);

  return (
    <>
      <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-lg shadow-lg w-80">
        <span
          className="close cursor-pointer self-end text-lg"
          onClick={closeModal}
        >
          &times;
        </span>
        <h2 className="text-lg font-bold mb-4">
          {isEditing ? "Update Project" : "Create Project"}
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmitProject}>
          <label>Project Name</label>
          <input
            type="text"
            value={project?.name || ""}
            onChange={(e) => updateProjectState("name", e.target.value)}
            required
            className="border border-gray-300 p-2 rounded mt-1"
          />

          <label>Project Deadline</label>
          <input
            type="date"
            value={project?.deadline || ""}
            onChange={(e) => updateProjectState("deadline", e.target.value)}
            required
            className="border border-gray-300 p-2 rounded mt-1"
          />

          <label>Status</label>
          <select
            value={project?.status || ""}
            onChange={(e) => updateProjectState("status", e.target.value)}
            required
            className="border border-gray-300 p-2 rounded mt-1"
          >
            <option value="select status">Select Status</option>
            <option value="planned">Planned</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <label>Project Description</label>
          <textarea
            value={project?.description || ""}
            onChange={(e) => updateProjectState("description", e.target.value)}
            rows={6}
            className="border border-gray-300 p-2 rounded mt-1"
            required
          />

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
              className="bg-primary-color text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : isEditing
                ? "Update Project"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
