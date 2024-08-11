import React, { useState } from 'react';                      
import { MdOutlineSearch } from "react-icons/md";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Notification from './Notification';
import AddTask from "../../../Pages/dashboard/task/add-task";
import  DashboardSideNav from "./dashboard-side-nav"

import UserAvatar from './UserAvatar';

export default function DashboardNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  return (
    <div>
      <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
        <div className='flex gap-4'>
          <div
            onClick={toggleSidebar}
            className='text-2xl text-gray-500 block'
          >
            <FontAwesomeIcon icon={faBars} />
          </div>

        </div>

        <div className='flex gap-2 items-center'>
          <div className='w-64 2xl:w-[400px] flex items-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6]'>
            <MdOutlineSearch className='text-gray-500 text-xl' />

            <input
              type='text'
              placeholder='Search...'
              className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'
            />
          </div>
          <AddTask />
          <Notification />
          <UserAvatar />
        </div>
      </div>
        <hr className="bg-black w-full"/>

      {/* Sidebar */}
      <DashboardSideNav isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  );
}
