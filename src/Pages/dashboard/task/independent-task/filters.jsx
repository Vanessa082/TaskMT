import { useDashboardContext } from "../../../../providers/context/dashboard-context";

export default function TableFilters() {
  const { tasks, setTaskQuery } = useDashboardContext();

  const handleStatusChange = ({ target: { value } }) => {
    setTaskQuery((prev) => {
      const _prev = { ...prev };
      if (!value) {
        delete _prev.status;
        return _prev;
      }
      return { ..._prev, status: value };
    });
  };

  // Extract unique status values for options
  const uniqueStatuses = Array.from(new Set(tasks.map(task => task.status)));

  return (
    <div className="flex gap-3">
      <select className='bg-background-color border-none flex w-28 py-1 px-4 rounded-full font-semibold'>
        <option value="">Project</option>
        <option value=""></option>
      </select>

      <select className='bg-background-color border-none flex w-28 py-1 px-4 rounded-full font-semibold' onChange={handleStatusChange}>
        <option value="">Status</option>

        {uniqueStatuses.map((status, index) => (
          <option key={index} value={status}>{status}</option>
        ))}
      </select>
    </div>
  );
};
