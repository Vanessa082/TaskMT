import React, { useEffect } from "react";
import TableRow from "./TableRow";
import { useDashboardContext } from "../../../../providers/context/dashboard-context";
import { useQueryRequest } from "../../../../providers/hooks/use-query-request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function TaskTable() {
  const { tasks, setTasks } = useDashboardContext();
  const { data, error, loading, refetch } = useQueryRequest("/tasks");

  useEffect(() => {
    if (data) setTasks(data);
  }, [data]);
  const TableHeader = () => {
    return (
      <thead className="border-b border-gray-300 bg-white ">
        <tr className="flex justify-between gap-10 lg:gap-0 px-10 font-sans">
          <th className="py-2"> Name</th>
          <th className="py-2">Priority</th>
          <th className="py-2">Status</th>
          <th className="py-2 hidden md:block">Deadline</th>
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
          <FontAwesomeIcon />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <TableHeader />
              <tbody>
                <TableRow />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
