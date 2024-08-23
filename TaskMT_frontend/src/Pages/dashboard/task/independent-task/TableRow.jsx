import clsx from "clsx";
import React from "react";
import { formatDate } from "../../../../utils/dateFormat";

export default function TableRow({ task }) {
  return (
    <tr className="border-b border-gray-200">
      <td className="px-4 py-2">{task.name}</td>

      <td className="px-4 py-2">
        <span
          className={clsx(
            "text-lg",
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
            "text-lg",
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

      <td className="px-4 py-2 hidden md:table-cell">{formatDate(task.deadline)}</td>
    </tr>
  );
}
