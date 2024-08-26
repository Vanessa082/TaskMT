import React from 'react';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../../utils/dateFormat';
import { useQueryRequest } from '../../../providers/hooks/use-query-request';
import { API_BASE_URL } from '../../../constants/constants';

export const Project = () => {
  const { id } = useParams();

  const { data: project, loading: projectLoading } = useQueryRequest(`/projects/${id}`);

  const { data: tasks, loading: tasksLoading, refetch: refetchTasks } = useQueryRequest(`/tasks?project_id=${id}`, {
    initialData: []
  });

  const handleTaskStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Completed' ? 'Pending' : 'Completed';
  
    try {
      await fetch(`${API_BASE_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      refetchTasks();
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };
  

  if (projectLoading || tasksLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{project?.name}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 flex items-center justify-between">
        <div>
          <p className="text-gray-700 mb-2">{project?.description}</p>
          <span className="text-gray-500">Deadline: {formatDate(project?.deadline)}</span>
        </div>

        <button className='text-white'>
          {project?.status}
        </button>
      </div>
      <div>
        <div className='flex justify-between'>
          <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
          {"allTasksCompleted" && project?.status !== 'completed' && (
            <button
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
            >
              Mark Project as Completed
            </button>
          )}
        </div>
        {tasks?.length === 0 ? (
          <p className="text-center  text-2xl md:text-3xl my-10 font-semibold text-slate-800">No tasks available for this project.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Task Name</th>
                  <th className="py-2 px-6 text-left">Duration</th>
                  <th className="py-3 px-6 text-center">Completed</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map(task => (
                  <tr key={task.id} className="border-b border-gray-200">
                    <td className="py-3 px-6 text-left">{task?.name}</td>
                    <td className="py-3 px-6 text-left">
                      {task?.time_estimate
                        ? `${task.time_estimate.hours} hours${task.time_estimate.minutes ? ` ${task.time_estimate.minutes} minutes` : ''}`
                        : 'No estimate'}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <input
                        type="checkbox"
                        checked={task.status === 'Completed'}  // Checkbox is checked if the task is completed
                        onChange={() => handleTaskStatus(task.id, task.status)}  // Toggle status on change
                      />
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};
