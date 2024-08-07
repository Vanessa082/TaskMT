import React from 'react'
import { useAppContext } from '../../../providers/context/app-context'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MdOutlineSearch} from "react-icons/md"
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function DashboardNavbar() {

  const {setCurrentUser} = useAppContext();
  return (
    <div className='flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0'>
      <div className='flex gap-4'>
        <button onClick={/*opensidebar component*/} className='text-2xl text-gray-400 block md:hidden'>
          <FontAwesomeIcon icon={faBars}/>
        </button>

        <div className="w-64:w-[400px] flex item-center py-2 px-3 gap-2 rounded-full bg-[#f3f4f6] ">
          <MdOutlineSearch />

          <input type="text" placeholder='search...'  className='flex-1 outline-none bg-transparent placeholder:text-gray-500 text-gray-800'/>
        </div>
      </div>

      
    </div>
  )
}
