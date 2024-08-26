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
      bg: "bg-text-color-4",
    },
    {
      _id: "2",
      label: "Completed Task",
      total: 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-secondary-color",
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
      <div className='w-full bg-white  p-5 shadow-md rounded-md flex items-center justify-between'>
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
    <div className=' py-4'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {stats.map(({ icon, bg, label, total }, index) => (
          <Card key={index} icon={icon} bg={bg} label={label} count={total} />
        ))}
      </div>

      <div className='w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8'>
        {/* /left */}

        <TaskTable />
        <Calendar />
      </div>
    </div>
  );
};

export default Dashboard;
