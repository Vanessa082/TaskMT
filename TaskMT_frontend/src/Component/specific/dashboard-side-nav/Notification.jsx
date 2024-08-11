import { Popover, PopoverPanel, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";

export default function Notification() {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <div
            className="inline-flex items-center cursor-pointer"
            aria-expanded={open}
          >
            <div className="w-8 h-8 flex items-center justify-center text-gray-800">
              <IoIosNotificationsOutline className="text-2xl" />
            </div>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <PopoverPanel className="absolute z-10 mt-2 w-56 bg-white border border-gray-300 rounded-md shadow-lg">
              {/* Your popover content goes here */}
              <div className="p-4">
                Notifications content
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
