import { useEffect } from "react";
import { useQueryRequest } from "../../../providers/hooks/use-query-request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useDashboardContext } from "../../../providers/context/dashboard-context";
import { API_BASE_URL } from "../../../constants/constants";
import clsx from "clsx";
import { useModalContext } from "../../../providers/context/modal-context";

export default function ManageProjects() {
  const { projects, setProjects } = useDashboardContext();
  const { data, error, loading, refetch } = useQueryRequest("/projects");

  const { setProjectModalOpen, setProject, setOnProjectModalDone } =
    useModalContext();

  useEffect(() => {
    if (data) setProjects(data);
  }, [data]);

  const openModal = (project) => {
    setProject(project);
    setProjectModalOpen(true);
    setOnProjectModalDone(() => {
      return refetch;
    });
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
              setProjects((prevProjects) =>
                prevProjects.filter((project) => project.project_id !== id)
              );
              toast("Successfully deleted");
            }
          } catch (error) {
            console.error("Error deleting project", error);
          }
        },
      },
    });
  };

  const TableHeader = () => (
    <thead className="border-b border-gray-300">
      <tr className="text-black text-left">
        <th className="py-2">Project Name</th>
        <th className="py-2">Status</th>
        <th className="py-2">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ project }) => (
    <tr className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10">
      <td className="py-2">
        <div className="flex items-center gap-2">
          <span className="line-clamp-2 text-base text-black">
            {project.name}
          </span>
        </div>
      </td>

      <td className="py-2 capitalize text-center">
        <span
          className={clsx(
            "text-lg",
            project.status === "completed"
              ? "text-green-500"
              : project.status === "active"
              ? "text-yellow-500"
              : project.status === "planned"
              ? "text-[#87b8e1]" 
              : "text-gray-500" // Default color if no match
          )}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </td>

      <td className="py-2 flex gap-2 justify-end">
        <FontAwesomeIcon
          icon={faPen}
          className="text-primary-color cursor-pointer"
          onClick={() => openModal(project)}
        />
        <FontAwesomeIcon icon={faEye} className="cursor-pointer" />

        <FontAwesomeIcon
          icon={faTrash}
          className="text-red-500 cursor-pointer"
          onClick={() => handleDelete(project.project_id)}
        />
      </td>
    </tr>
  );


  return (
    <div className="w-full md:px-1 px-0 mb-6">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl">Project Overview</h2>
      </div>

      <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
        {projects.length === 0 ? (
          <p>No projects available. Please add some projects.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full mb-5">
              <TableHeader />
              <tbody>
                {projects.map((project) => (
                  <TableRow key={project.project_id} project={project} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
