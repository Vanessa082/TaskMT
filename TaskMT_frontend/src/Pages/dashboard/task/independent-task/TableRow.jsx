import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { formatDate } from "../../../../utils/dateFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { API_BASE_URL } from "../../../../constants/constants";
import { useDashboardContext } from "../../../../providers/context/dashboard-context";
import { toast } from "sonner";

export default function TableRow({ task }) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const { tasks, setTasks } = useDashboardContext();

  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);

    if (dropdownRef.current) dropdownRef.current?.focus();
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

  useEffect(() => {
    if (openDropdown && dropdownRef.current) dropdownRef.current?.focus();
  }, [openDropdown]);

  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2" tabIndex={3}>
        {task.name}
      </td>
      <td className="px-4 py-2">
        <span
          className={clsx(
            "text-xs",
            task.priority === "Low"
              ? "text-yellow-500"
              : task.priority === "Medium"
              ? "text-green-500"
              : task.priority === "High"
              ? "text-red-500"
              : "text-gray-500"
          )}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </td>
      <td className="px-4 py-2">
        <span
          className={clsx(
            "text-xs",
            task.status === "Pending"
              ? "text-orange-500"
              : task.status === "Completed"
              ? "text-blue-500"
              : "text-gray-500"
          )}
        >
          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
      </td>
      <td className="px-4 py-2 hidden md:table-cell text-gray-500 text-xs">
        {formatDate(task.deadline)}
      </td>
      <td className="px-4 py-2 text-right relative">
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
            <div className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
              View Task
            </div>
            <div
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleDelete(task.id)}
            >
              Delete Task
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}
