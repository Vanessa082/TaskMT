import { useModalContext } from "../../../providers/context/modal-context"

export default function ViewTaskModal() {
  const { data: task, setTask, loading: tasksLoading, setTaskModalOpen } = useModalContext()
  const closeModal = () => {
    setTask(null);
    setTaskModalOpen(false)
  }
  if (tasksLoading) {
    return <p className="text-center text-gray-500">  Loading ...</p>
  }
  return (
    <>
    <div className="fixed inset-0 z-10 bg-gray-800 bg-opacity-50"/>
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-background-color p-4 rounded-lg shadow-lg w-96">
      <h1>{task?.name} <span>{task?.status}</span> <span>{task?.priority}</span></h1>
      <p>{task?.description}</p>

      <table>
        <thead>
          <tr>Duration</tr>
          <tr>Start Date</tr>
          <tr>Deadline</tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {task?.time_estimate
                ? `${task?.time_estimate.hours} hours${task?.time_estimate.minutes ? ` ${task?.time_estimate.minutes} minutes` : ''}`
                : 'No estimate'}
            </td>
            <td>
              <tr>{task?.start_time}</tr>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <label htmlFor="checkbox">
        {task.recurrence_pattern}
        <input type="checkbox" />
      </label>
    </div>
    </>
  )
} 