import React, { useEffect } from "react";
import TableRow from "./TableRow";
import { useDashboardContext } from "../../../../providers/context/dashboard-context";

export function TaskTable() {
  const {
    tasks,
    tasksLoading,
    refetchTasks,
  } = useDashboardContext();

  const TableHeader = () => {
    return (
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
      {tasks.length === 0 ? (
        <p className="text-center  text-2xl md:text-3xl my-10 font-semibold text-slate-800">No tasks available for this project.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <TableHeader />
          <tbody>
            {tasks.map((task) => (
              <TableRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
