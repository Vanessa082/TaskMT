import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCog,
  faHome,
  faTasks,
  faThLarge,
  faTimes,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Link } from "react-router-dom";
import ProjectNavComponent from "./project_nav-components"

const sidebarContent = [
  {
    text: "Dashboard",
    to: "/dashboard",
    icon: faThLarge,
  },
  {
    text: "Home",
    to: "/",
    icon: faHome,
  },
  {
    text: "Calendar",
    to: "/calendar",
    icon: faCalendarAlt,
  },
  {
    text: "Tasks",
    to: "/tasks",
    icon: faTasks,
  },
];

const trashLink = {
  text: "Trash",
  to: "/dashboard/trashed",
  icon: faTrashAlt,
};

export default function DashboardSideNav({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64  bg-white shadow-lg z-20 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end pr-6 pl-4 py-4">
        <div onClick={toggleSidebar} className="text-xl">
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      {/* Sidebar content goes here */}

      <nav className="w-full max-w-[300px] min-h-full border flex flex-col items-start justify-between bg-red text-text-color-3 font-sans px-6  text-xl">
        <div className="w-full">
          <div className="flex-1 flex flex-col gap-y-5 py-8 w-full">
            {sidebarContent.map(({ text, to, icon }) => (
              <Link
                key={text}
                to={to}
                className={clsx(
                  "w-full flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-blue-100"
                )}
              >
                <FontAwesomeIcon icon={icon} />
                <span>{text}</span>
              </Link>
            ))}
          </div>

          <div className="w-full">
            <ProjectNavComponent />
          </div>
        <div className="w-full px-3 py-2 flex gap-2 items-center cursor-pointer text-lg text-gray-800 hover:bg-red-200 rounded-full mb-4">
          <FontAwesomeIcon icon={trashLink.icon} />
          <Link
            to={trashLink.to}
            className={clsx(
              "w-full flex gap-2 items-center text-base"
            )}
          >
            {trashLink.text}
          </Link>
        </div>

        <div className="w-full px-3 py-2 flex gap-2 items-center cursor-pointer text-lg text-gray-800 hover:bg-blue-100 rounded-full">
          <FontAwesomeIcon icon={faCog} />
          <span>Settings</span>
        </div>
        </div>

      </nav>
    </div>
  );
}
