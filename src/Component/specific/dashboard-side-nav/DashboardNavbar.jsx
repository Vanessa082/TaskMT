import React, { useState } from 'react';
// import { MdOutlineSearch } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Notification from './Notification';
import AddTask from "../../../Pages/dashboard/task/add-task";
import DashboardSideNav from "./dashboard-side-nav";
import UserAvatar from './UserAvatar';
import Calendar from '../../../Pages/dashboard/calender/calendar';

export default function DashboardNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <div className='flex justify-between items-center bg-secondary-color px-6 py-3 2xl:py-4 sticky z-10 top-0 w-full'>
        <div className='flex gap-4 items-center'>
          {/* Menu icon always visible */}
          <div
            onClick={() => setIsSidebarOpen(true)}
            className='text-2xl text-gray-500 cursor-pointer'
          >
            <FontAwesomeIcon icon={faBars} className='text-accent-color'/>
          </div>
          <h1 className='font-sans font-bold text-xl text-accent-color'>Dashboard</h1>
        </div>
         <div className='flex gap-2 items-center'>
          <AddTask />
          <Notification />
          <Calendar />

          {/* <UserAvatar /> */}
        </div>
      </div>
      <hr className="bg-[#e1d6ce] w-full" />

      {/* Sidebar */}
      <DashboardSideNav
        isOpen={isSidebarOpen}
        openSidebar={openSidebar}
        closeSidebar={closeSidebar}
      />
    </div>
  );
}
