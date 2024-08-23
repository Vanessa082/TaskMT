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
        </tr>
      </thead>
    );
  };

  return (
    <div className="">
      <div className="w-full md:px-1 px-0 mb-6">
        <h2>Task List</h2>
      </div>

      <div className="bg-white px-2 md:px-6 py-4 shadow-md rounded">
        {tasks.length === 0 ? (
          <FontAwesomeIcon icon={faClipboardList} />
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <TableHeader />
              <tbody>
                {tasks.map((task) => (
                  <TableRow key={task.task_id} task={task} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
