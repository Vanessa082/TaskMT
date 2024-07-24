import './dashboard.css'
import Task from '../Task/Task';
import Date from '../Date';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div className=" flex items-center justify-center min-h-screen 	 h-96">
      
      <div className="bg-white h-5/6  gap-8	 flex items-center justify-center flex-col menubar">

        <h3>Dashboard</h3>
        <div className="bg-black w-3/5 h-1/4 user">

        </div>

        <h2>Task</h2>
        <h2>Project</h2>

      </div>
      <div className="bg-zinc-50	h-5/6 mainboard flex items-center flex-col justify-center">
      <Date />
        <div className=" bg-white flex items-left h-screen 	taskbtn">
          <Task/>
        </div>
      </div>
    </div>
  );
}
export default Dashboard