import React, { useEffect } from "react";
import TableRow from "./TableRow";
import { useDashboardContext } from "../../../../providers/context/dashboard-context";
import TableFilters from "./filters";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaSpinner } from "react-icons/fa";

const TableHeader = () => {
  return (
    <thead>
      <tr className=" text-accent-color uppercase text-sm leading-normal">
        <th className="px-4 py-2"></th>
        <th className="px-4 py-2 text-left">Name</th>
        <th className="px-4 py-2 text-left">Priority</th>
        <th className="px-4 py-2 text-left hidden md:table-cell">Project</th>
        <th className="px-4 py-2 text-left">Status</th>
        <th className="px-4 py-2 text-left hidden md:table-cell">Deadline</th>
      </tr>
    </thead>
  );
};

export function TaskTable() {
  const {
    tasks,
    tasksLoading,
    refetchTasks,
    projects
  } = useDashboardContext();


  return (
    <div className="bg-lighter-shade-s-color p-4 rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <h2>Task List</h2>
          {
            tasksLoading ? (
              <>
                <FontAwesomeIcon icon={FaSpinner} spin />
                loading...
              </>
            ) : null
          }
        </div>

        <TableFilters />
      </div>

      {tasks.length === 0 ? (
        <p className="text-center  text-2xl md:text-3xl my-10 font-semibold text-slate-800">No tasks available.</p>
      ) : (
        <table className="min-w-full">
          <TableHeader />
          <tbody className="relative">


            {tasks.map((task) => (
              <TableRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
