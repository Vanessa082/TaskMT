import React from "react";
import {
  MdAdminPanelSettings,
} from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import clsx from "clsx";
import { TaskTable } from "../task/independent-task/TaskTable";
import Calendar from "../calender/calendar";

const Dashboard = () => {
  const stats = [
    {
      _id: "1",
      label: "Task",
      total: 0,
      icon: <FaNewspaper />,
      bg: "bg-[#d398e7]",
    },
    {
      _id: "2",
      label: "Completed Task",
      total: 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#4caf50]",
    },
    {
      _id: "3",
      label: "Pending ",
      total: 0,
      icon: <LuClipboardEdit />,
      bg: "bg-[#f59e0b]",
    },
    {
      _id: "4",
      label: "Projects",
      total: 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]" || 0,
    },
  ];

  const Card = ({ label, count, bg, icon }) => {
    return (
      <div className='w-full  p-5 shadow-md rounded-md flex items-center justify-between bg-lighter-shade-s-color'>
        <div className=' flex flex-1 flex-col justify-between'>
          <p className='text-base text-gray-600'>{label}</p>
          <span className='text-2xl font-semibold'>{count}</span>
          <span className='text-sm text-gray-400'>{"Period"}</span>
        </div>

        <div
          className={clsx(
            "w-10 h-10 rounded-full flex items-center justify-center text-white",
            bg
          )}
        >
          {icon}
        </div>
      </div>
    );
  };
  return (
    <div className='flex flex-col justify-between gap-5 py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>
        <TaskTable /> 
    </div>
  );
};

export default Dashboard;
