import clsx from "clsx";
import React from "react";
export default function TableRow({ task }) {
  return (
    <tr>
    <td>
      <div>
        <span>{task.name}</span>
      </div>
    </td>

    <td>
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
        {task.priority.charAt(0).toUpperCase() + task.priority(slice(1))}
      </span>
    </td>

    <td>
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
        {task.status.charAt(0).toUpperCase() + task.status(slice(1))}
      </span>
    </td>

    <td>
      <span>{task.deadline}</span>
    </td>
  </tr>
  )
}
