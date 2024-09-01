import { useState, useEffect } from "react";
import { useModalContext } from "../../../providers/context/modal-context";
import { useDashboardContext } from "../../../providers/context/dashboard-context";
import { toast } from "sonner";
import { API_BASE_URL } from "../../../constants/constants";

export default function TaskCreationModal() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("basicInfo");
  const [loading, setLoading] = useState(false);

  const { task, setTask, setTaskModalOpen } = useModalContext();
  const { projects, refetchTasks } = useDashboardContext();
  const updateTaskState = (key, value) => {
    setTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const closeModal = async () => {
    await refetchTasks()
    setTask(null);
    setTaskModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("ttttttttt", task);

    const taskToSubmit = {
      ...task,
      start_time: task.start_time || null,
      deadline: task.deadline || null,
      priority: task.priority || "Low",
      status: task.status || "Not Started",

    };

    try {
      setLoading(true);

      const url = `${API_BASE_URL}/tasks/${isEditing ? task.task_id : ""}`;
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskToSubmit),
      });
      console.log("Response status:", response.status);

      const result = await response.json();
      console.log("Result:", result);
      toast.success(`Task ${isEditing ? "updated" : "created"} successfully.`);
      closeModal();
    } catch (error) {
      console.error("Error submitting task:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (task && task.task_id) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [task]);


  const renderTabContent = () => {
    switch (activeTab) {
      case "basicInfo":
        return (
          <>
            <label>Task Name</label>
            <input
              type="text"
              value={task?.name || ""}
              onChange={(e) => updateTaskState("name", e.target.value)}
              required
              className="border border-gray-300 p-2 "
            />

            <label>Description</label>
            <textarea
              value={task?.description || ""}
              onChange={(e) => updateTaskState("description", e.target.value)}
              rows={4}
              className="border border-gray-300 p-2 rounded mt-1"
              required
            />
          </>
        );

      case "dates":
        return (
          <>
          <label>Dates</label>
            <input
              type="date"
              value={task?.start_time || ""}
              onChange={(e) => updateTaskState("start_time", e.target.value || null)}
              className="border border-gray-300 p-2 rounded mt-1"
            />


            <label>Due Date</label>
            <input
              type="date"
              value={task?.deadline || ""}
              onChange={(e) => updateTaskState("deadline", e.target.value || null)}
              className="border border-gray-300 p-2 rounded mt-1"
            />
          </>
        );

      case "details":
        return (
          <>
            <label>Priority</label>
            <select
              value={task?.priority || "Low"}
              onChange={(e) => updateTaskState("priority", e.target.value)}
              className="border border-gray-300 p-2 rounded mt-1"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>

            <label>Status</label>
            <select
              value={task?.status || "Not Started"}
              onChange={(e) => updateTaskState("status", e.target.value)}
              className="border border-gray-300 p-2 rounded mt-1"
            >
              <option value="Not Started">Not Started</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="On hold">On hold</option>
            </select>
          </>
        );

      case "advanced":
        return (
          <>
            <label>Project</label>
            <select
              value={task?.project_id || ""}
              onChange={(e) => updateTaskState("project_id", e.target.value)}
              className="border border-gray-300 p-2 rounded mt-1"
            >
              <option value="">Select a project</option>
              {projects?.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>

            <label>Time Estimate</label>
            <input
              type="text"
              value={task?.time_estimate || ""}
              onChange={(e) => updateTaskState("time_estimate", e.target.value)}
              placeholder="e.g., 2 hours, 3 days"
              className="border border-gray-300 p-2 rounded mt-1"
            />

            <label className="flex items-center mt-2">
              Recurring Task
              <input
                type="checkbox"
                checked={task?.is_recurring || false}
                onChange={(e) => updateTaskState("is_recurring", e.target.checked)}
                className="ml-2"
              />
            </label>

            {task?.is_recurring && (
              <label className="mt-2">
                Recurrence Pattern
                <input
                  type="text"
                  value={task?.recurrence_pattern || ""}
                  onChange={(e) => updateTaskState("recurrence_pattern", e.target.value)}
                  placeholder="e.g., every Monday"
                  className="border border-gray-300 p-2 rounded mt-1"
                />
              </label>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50" />
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white p-4 rounded-lg shadow-lg w-96">
        <button
          className=" cursor-pointer self-end text-lg"
          onClick={closeModal}
        >
          &times;
        </button>
        <h2 className="text-lg font-bold ">
          {isEditing ? "Update Task" : "New Task"}
        </h2>

        <div className="flex space-x-4 ">
          <button
            type="button"
            className={`p-2 rounded  ${activeTab === "basicInfo" ? "bg-primary-color cursor-pointer text-background-color" : "bg-background-color text-accent-color"}`}
            onClick={() => setActiveTab("basicInfo")}
          >
            Basic Info
          </button>
          <button
            type="button"
            className={`p-2 rounded  ${activeTab === "dates" ? "bg-primary-color cursor-pointer text-background-color" : "bg-background-color text-accent-color"}`}
            onClick={() => setActiveTab("dates")}
          >
            Dates
          </button>
          <button
            type="button"
            className={`p-2 rounded  ${activeTab === "details" ? "bg-primary-color cursor-pointer text-background-color" : "bg-background-color text-accent-color"}`}
            onClick={() => setActiveTab("details")}
          >
            Details
          </button>
          <button
            type="button"
            className={`p-2 rounded  ${activeTab === "advanced" ? "bg-primary-color cursor-pointer text-background-color" : "bg-gray-200 text-gray-700"}`}
            onClick={() => setActiveTab("advanced")}
          >
            Advanced
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {renderTabContent()}

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-primary-color cursor-pointer text-background-color px-4 py-2 rounded"
              disabled={loading}
            >
              {loading
                ? "Submitting..."
                : isEditing
                  ? "Update Task"
                  : "New Task"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
