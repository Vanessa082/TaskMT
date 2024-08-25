import React from 'react';
import { useParams } from 'react-router-dom';
import { useQueryRequest } from '../../../providers/hooks/use-query-request';
import { formatDate } from '../../../utils/dateFormat';

export const Project = () => {
  const { id } = useParams();

  const { data: project, loading: projectLoading } = useQueryRequest(`/projects/${id}`);
t
  const { data: tasks, loading: tasksLoading } = useQueryRequest(`/tasks?project_id=${id}`);
  

  if (projectLoading || tasksLoading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">{project?.name}</h1>
      <button>
        {project?.status}
      </button>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <p className="text-gray-700 mb-2">{project?.description}</p>
        <span className="text-gray-500">Deadline: {formatDate(project?.deadline)}</span>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Tasks</h2>
        {tasks?.length === 0 ? (
          <p className="text-center text-gray-500">No tasks available for this project.</p>
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
                    <td className="py-3 px-6 text-left">{task.name}</td>
                    <td className="py-3 px-6 text-left"></td>
                    <td className="py-3 px-6 text-center">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {allTasksCompleted && project?.status !== 'completed' && (
          <button
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
          >
            Mark Project as Completed
          </button>
        )}
      </div>
    </div>
  );
};
