import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../../../utils/dateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../../../constants/constants";
import { useDashboardContext } from "../../../../providers/context/dashboard-context";
import { toast } from "sonner";
import { useModalContext } from "../../../../providers/context/modal-context";

export default function TableRow({ task }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { tasks, setTasks } = useDashboardContext();
  const { setTask, setTaskModalOpen, } = useModalContext();
  const dropdownRef = useRef();

  const openModal = (task) => {
    setTask(task);
    setTaskModalOpen(true)
  }

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);

    if (dropdownRef.current) dropdownRef.current?.focus();
  };

  const handleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';

    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  const handleDelete = (id) => {
    toast("Confirm Delete", {
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/tasks/${id}`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
            if (response.ok) {
              setTasks((prevTasks) =>
                prevTasks.filter((task) => task.id !== id)
              );
              toast("Successfully deleted");
            }
          } catch (error) {
            console.error('Error deleting task:', error);
          }
        },
      },
    });
  };

  // const getProjectName = (projectId) => {
  //   const project = projects.find((proj) => proj.id === projectId)
  //   return project ? project.name : "--"
  // }

  useEffect(() => {
    if (openDropdown && dropdownRef.current) dropdownRef.current?.focus();
  }, [openDropdown]);

  return (
    <tr className="hover:bg-[var(--primary-color)] bg-[var(--lighter-shade-s-color)] rounded-lg mb-2 text-[var(--muted-text-color)]">
      <td className="py-3 px-4 text-center">
        <input
          type="checkbox"
          checked={task.status === 'Completed'}
          onChange={() => handleTaskStatus(task.id, task.status)}
        />
      </td>

      <td className="" tabIndex={3}>
        {task.name}
      </td>

      <td className="">
        <span
          className={clsx(
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
          )}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </td>

      <td className="">
        <span
          className={clsx(
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
          )}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </td>

      <td className="hidden md:table-cell text-xs">
        {formatDate(task.deadline)}
      </td>

      <td className="py-1 text-left relative">
        <div
          onClick={toggleDropdown}
          className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </div>
        {openDropdown && (
          <div
            ref={dropdownRef}
            tabIndex={2}
            onBlur={() => setOpenDropdown(false)}
            className="absolute right-0 top-full -mt-1 w-32 bg-white border rounded shadow-lg z-10 outline-none"
          >
            <div className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
              View
            </div>
            <div className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer" onClick={() => openModal(task)}>
              Edit
            </div>
            <div
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </div>
          </div>
        )}
      </td>
    </tr>

  );
}
