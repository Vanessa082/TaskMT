import { useEffect, useState } from "react";
import { useGetRequest } from "../../../providers/hooks/use-fetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import SixDotEllipsis from "../../../assets/custom-icons/six-dot-elipsis";
import ProjectDetailsModal from "./project-details-modal";
import { API_BASE_URL } from "../../../constants/constants";
import { toast } from "sonner";

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, error, loading } = useGetRequest("/projects");

  useEffect(() => {
    if (data) setProjects(data);
  }, [data]);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
  };

  const updateProjectState = (updatedProject) => {
    setProjects((prevProjects) =>
      // checks if there is any project in the prevProjects array that has the same id as updatedProject.
      // If the condition prevProjects.some(project => project.id === updatedProject.id) is true (i.e., there is a project with the same id in prevProjects), the code after the ? will be executed
      prevProjects.some((project) => project.project_id === updatedProject.project_id)
        ? prevProjects.map((project) =>
            project.project_id === updatedProject.project_id ? updatedProject : project
          )
        : [...prevProjects, updatedProject]
    );
  };

  const handleDelete = async (id) => {
    toast("Are you sure you want to delete this project?", {
      action: {
        label: "Delete Project",
        onClick: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            if (response.ok) {
              setProjects((prevProjects) => {
                const data = prevProjects.filter(
                  (project) => project.project_id !== id
                );
                return data;
              });

              toast("Successfully deleted");
            }
          } catch (error) {
            console.error("Error deleting project", error);
          }
        },
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-between gap-8 font-sans px-10">
      <h2 className="text-2xl">Project Overview</h2>
      {projects.length === 0 ? (
        <p>No projects available. Please add some projects.</p>
      ) : ( 
        projects.map((project) => (
          <div
            key={project.project_id}
            className="text-xl flex items-center bg-text-color-1 py-4 pl-2 border border-black/15 mb-5 rounded-lg transition-all duration-300 shadow-[2px_2px_3px_rgba(0,0,0,0.4)] w-[40%] gap-60"
          >
            <div className="flex flex-col gap-2">
              <h2 className="flex justify-between items-start gap-6">
                <SixDotEllipsis /> {project.name}
              </h2>
              <span className={`status ${project.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            <div className="flex justify-between items-center gap-20">
              <FontAwesomeIcon
                icon={faPen}
                className="text-primary-color"
                onClick={() => openModal(project)}
              />
              <FontAwesomeIcon icon={faEye} />
              <FontAwesomeIcon
                icon={faTrash}
                className="text-red-500"
                onClick={() => handleDelete(project.project_id)}
              />
            </div>
          </div>
        ))
      )}

      {isModalOpen && (
        <ProjectDetailsModal
          initialData={selectedProject}
          onClose={closeModal}
          updateProjectState={updateProjectState}
          mode={selectedProject ? "edit" : "create"}
        />
      )}
    </div>
  );
}
