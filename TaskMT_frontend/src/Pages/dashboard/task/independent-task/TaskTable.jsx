import React, { useEffect } from "react";
import TableRow from "./TableRow";
import { useDashboardContext } from "../../../../providers/context/dashboard-context";
import { useQueryRequest } from "../../../../providers/hooks/use-query-request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

export function TaskTable() {
  const { tasks, setTasks } = useDashboardContext();
  const { data, error, loading, refetch } = useQueryRequest("/tasks");

  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);

  const TableHeader = () => {
    return (
      <thead className="bg-white border-b border-gray-300">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Priority</th>
          <th className="px-4 py-2 text-left">Status</th>
          <th className="px-4 py-2 text-left hidden md:table-cell">Deadline</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
    );
  };

  return (
    <div className="">
      <div className="w-full md:px-1 px-0 mb-6">
        <h2>Task List</h2>
      </div>
      <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded w-full">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center w-full h-64">
            <FontAwesomeIcon
              icon={faClipboardList}
              className="text-gray-400 text-6xl mb-4"
            />
            <p className="text-gray-500 text-lg">No tasks available</p>
          </div>
        ) : (
          <table className="min-w-full table-auto">
            <TableHeader />
            <tbody>
              {tasks.map((task) => (
                <TableRow key={task.id} task={task} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
