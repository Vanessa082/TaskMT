import { useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../../../constants/constants";

export default function ProjectDetailsModal({ onClose }) {
  const [projectDescription, setProjectDescription] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDeadline, setProjectDeadline] = useState(() => {
    const today = new Date().toISOString().split("T")[0];
    return today;
  });

  const modalRef = useRef(null);

  const handleProjectDescription = (e) => setProjectDescription(e.target.value);
  const handleProjectName = (e) => setProjectName(e.target.value);
  const handleProjectDeadline = (e) => setProjectDeadline(e.target.value);

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
      const response = await fetch(`${API_BASE_URL}/projects/project`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorisation": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          name : projectName,
          description : projectDescription,
          deadline : projectDeadline,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

    } catch (error) {
      console.error("Error adding projects", error)
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div ref={modalRef} className="bg-white p-4 rounded flex flex-col ">
        <span className="close cursor-pointer" onClick={onClose}>
          &times;
        </span>
        <form className="flex flex-col" onSubmit={handleSubmitProject}>
          <label>Project Name</label>
          <input type="text" value={projectName} onChange={handleProjectName} />
          <input
            type="date"
            value={projectDeadline}
            onChange={handleProjectDeadline}
          />
          <label className="flex flex-col">
            Project Description
            <textarea
              value={projectDescription}
              onChange={handleProjectDescription}
              rows={6}
              cols={60}
              placeholder="Provide a detailed description of the project, including goals, objective ..."
            />
          </label>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="button">Edit</button>
          <button type="button">Save</button>
        </form>
      </div>
    </div>
  );
}
