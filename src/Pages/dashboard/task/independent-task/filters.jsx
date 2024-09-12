import { useDashboardContext } from "../../../../providers/context/dashboard-context";

export default function TableFilters() {
  const { tasks, setTaskQuery, projects } = useDashboardContext();

  // const handleStatusChange = ({ target: { value } }) => {
  //   setTaskQuery((prev) => {
  //     const _prev = { ...prev };
  //     if (!value) {
  //       delete _prev.status;
  //       return _prev;
  //     }
  //     return { ..._prev, status: value };
  //   });
  // };

  const getProjectName = projects.reduce((map, project) => {
    map[project.id] = project.name;
    return map;
  }, {});

  const handleProjectChange = ({ target: { value } }) => {
    setTaskQuery((prev) => {
      const _prev = { ...prev };
      if (!value) {
        delete _prev.project_id;
        return _prev;
      }
      return { ..._prev, project_id: value };
    });
  };

  const uniqueProjects = Array.from(new Set(tasks.map(task => task.project_id)));

  const uniqueStatuses = Array.from(new Set(tasks.map(task => task.status)));

  return (

    <select
      className='bg-primary-color border-none flex w-28 py-1 px-4 rounded-full font-semibold'
      onChange={handleProjectChange}
    >
      <option value="">Projects</option>
      {uniqueProjects.map((project_id, index) => (
        <option key={index} value={project_id}>
          {getProjectName[project_id]}
        </option>
      ))}
      {/* <select 
        className='bg-background-color border-none flex w-28 py-1 px-4 rounded-full font-semibold' 
        onChange={handleStatusChange}
      >
        <option value="">Status</option>
        {uniqueStatuses.map((status, index) => (
          <option key={index} value={status}>{status}</option>
        ))}
      </select> */}
    </select>

  );
};