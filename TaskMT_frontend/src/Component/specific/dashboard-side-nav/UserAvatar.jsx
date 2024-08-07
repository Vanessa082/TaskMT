import React, { Fragment, useState } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5"
import { useAppContext } from "../../../providers/context/app-context";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";

function UserAvatar() {
  const [open, setOpen] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const { setCurrentUser } = useAppContext();

  const handleLogout = () => {
    // required logic
  };
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="w-10 h-10 2xl:w-12 2xl:h-12 items-center justify-center rounded-full bg-blue-600">
            <span className="text-white font-semibold">
              {/* get current user initials */}
            </span>
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-95"
        >
          <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-gray-100 rounded-md bg-white shadow-2xl ring-1 ring-black/5 focus:outline-none">
            <div className="p-4">
              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={() => setOpen(true)}
                    className={clsx(
                      "text-gray-700 group flex w-full items-center rounded-md px-2 py-2 text-base",
                      active && "bg-gray-300"
                    )}
                  >
                    <FaUser className="mr-2" aria-hidden="true" />
                    Profile
                  </button>
                )}
              </MenuItem>

              <MenuItem>
                {({ active }) => {
                  <button onClick={setOpenPassword}>
                    <FaUserLock className="mr-2" aria-hidden="true" />
                    Change Password
                  </button>;
                }}
              </MenuItem>

              <MenuItem>
                {({ active }) => {
                  <button
                    onClick={logoutHandler}
                    className={`text-red-600 group flex w-full items-center rounded-md px-2 py-2 text-base`}
                  >
                    <IoLogOutOutline className="mr-2" aria-hidden="true" />
                    Logout
                  </button>;
                }}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
}

export default UserAvatar;
