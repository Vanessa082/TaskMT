import React, { useState } from 'react';                      
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MdOutlineSearch} from "react-icons/md"
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Notification from './Notification';
import AddTask from "../../../Pages/dashboard/task/add-task";
import DashboardSideNav from './dashboard-side-nav'
import UserAvatar from './UserAvatar';

export default function DashboardNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(prevState => !prevState)
  }

  return (
    <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        
        <div onClick={handleSidebarOpen} className='text-2xl text-gray-400 block '>
          <FontAwesomeIcon icon={faBars}/>
        </div>

        <div className="w-64:w-[400px] flex item-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6] ">
          <MdOutlineSearch />

          <input type="text" placeholder='search...'  className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'/>
        </div>
      </div>

      <div className='flex gap-2 items-center'>
        <AddTask />
        <Notification />
        <UserAvatar />
      </div>
      {isSidebarOpen && <DashboardSideNav />}

    </div>
  )
}
