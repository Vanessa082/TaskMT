import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "sonner";
import { useDashboardContext } from "../../../providers/context/dashboard-context";
import { API_BASE_URL } from "../../../constants/constants";
import clsx from "clsx";
import { useModalContext } from "../../../providers/context/modal-context";
import { Link } from "react-router-dom";

export default function ManageProjects() {
  const { projects, setProjects, refetchProjects } = useDashboardContext();
  const { setProjectModalOpen, setProject } = useModalContext();

  const openModal = (project) => {
    setProject(project);
    setProjectModalOpen(true);
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
              refetchProjects();
            }
          } catch (error) {
            console.error("Error deleting project", error);
          }
        },
      },
    });
  };

  const TableHeader = () => (
    <thead className="bg-background-color text-accent-color font-sans font-bold">
      <tr>
        <th className="py-3 px-4 text-left text-sm ">Project Name</th>
        <th className="py-3 px-4 text-center text-sm ">Status</th>
        <th className="py-3 px-4 text-right text-sm ">Actions</th>
      </tr>
    </thead>
  );

  const TableRow = ({ project }) => (
    <tr className="b text-accent-color font-sans font-medium rder-b border-gray-200 bg-lighter-shade-s-color hover:bg-gray-50">
      <td className="py-3 px-4 text-left text-sm">
        {project.name}
      </td>
      <td className="py-3 px-4 text-center text-sm">
        <span
          className={clsx(
            "py-1 px-3 rounded-full text-xs font-semibold",
            project.status === "completed"
              ? "bg-green-100 text-green-600"
              : project.status === "active"
                ? "bg-yellow-100 text-yellow-600"
                : project.status === "planned"
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-600"
          )}
        >
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </td>
      <td className="py-3 px-4 text-right flex items-center justify-end gap-2">
        <FontAwesomeIcon
          icon={faPen}
          className="text-accent-color cursor-pointer hover:text-blue-700"
          onClick={() => openModal(project)}
        />
        <Link to={`/dashboard/projects/${project.id}`}>
          <FontAwesomeIcon icon={faEye} className="text-green-500 cursor-pointer hover:text-green-700" />
        </Link>
        <FontAwesomeIcon
          icon={faTrash}
          className="text-red-500 cursor-pointer hover:text-red-700"
          onClick={() => handleDelete(project.id)}
        />
      </td>
    </tr>
  );

  return (
    <div className="p-6  min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-accent-color mb-6">Project Overview</h2>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {projects.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No projects available. Please add some projects.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <TableHeader />
                <tbody>
                  {projects.map((project) => (
                    <TableRow key={project.id} project={project} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
