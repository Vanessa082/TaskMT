import { useDashboardContext } from "../../../providers/context/dashboard-context";
import { useModalContext } from "../../../providers/context/modal-context";

export default function ViewTaskModal() {
  const { data: task, setTask, loading: tasksLoading, setTaskModalOpen } = useModalContext();
  const { projects } = useDashboardContext();

  const closeModal = () => {
    setTask(null);
    setTaskModalOpen(false);
  };

  const getProjectName = (projectId) => {
    const project = projects.find((proj) => proj.id === projectId);
    return project ? project.name : "--";
  };

  if (tasksLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <>
      <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-lg shadow-lg w-96">
        <span
          className="close cursor-pointer self-end text-lg"
          onClick={closeModal}
        >
          &times;
        </span>

        <h1 className="text-lg font-bold mb-4">{task?.name}</h1>

        <span className="text-sm text-gray-500 mb-2">
          Project: {getProjectName(task.project_id)}
        </span>

        <div className={clsx(
          "inline-flex items-center justify-center w-24 py-1 px-2 rounded-full text-xs font-semibold",
          task.priority === "Low"
            ? "bg-yellow-100 text-yellow-500"
            : task.priority === "Medium"
              ? "bg-green-100 text-green-500"
              : task.priority === "High"
                ? "bg-blue-200 text-blue-700"
                : task.priority === "Urgent"
                  ? "bg-red-100 text-red-500"
                  : "text-gray-500"
        )}>
          {task?.priority}
        </div>

        <div className={clsx(
          "inline-flex items-center justify-center w-24 py-1 px-2 rounded-full text-xs font-semibold",
          task.status === "Not Started"
            ? "bg-blue-100 text-blue-500"
            : task.status === "Pending"
              ? "bg-orange-100 text-orange-500"
              : task.status === "Completed"
                ? "bg-green-100 text-green-500"
                : task.status === "On hold"
                  ? "bg-yellow-100 text-yellow-500"
                  : "text-gray-500"
        )}>
          {task?.status}
        </div>

        <p className="mt-4 mb-2">{task?.description || "No description available"}</p>

        <table className="w-full text-left mt-2 mb-4">
          <thead>
            <tr className="text-gray-700">
              <th>Duration</th>
              <th>Start Date</th>
              <th>Deadline</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-sm text-gray-600">
              <td>
                {task?.time_estimate
                  ? `${task?.time_estimate.hours} hrs ${task?.time_estimate.minutes} mins`
                  : "No estimate"}
              </td>
              <td>{task?.start_time || "--"}</td>
              <td>{task?.deadline || "--"}</td>
            </tr>
          </tbody>
        </table>

        {task.recurrence_pattern && (
          <label className="block mt-2">
            Recurrence: {task.recurrence_pattern}
            <input type="checkbox" checked readOnly />
          </label>
        )}
      </div>
    </>
  );
}
