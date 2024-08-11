import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCalendarAlt, faHome, faTasks, faTrashAlt, faUsers, faCog } from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import ProjectNavComponents from "./project_nav-components";

const sidebarContent = [
  {
    text: "Home",
    to: "/",
    icon: faHome,
  },
  {
    text: "Calendar",
    to: "/dashboard/calendar",
    icon: faCalendarAlt,
  },
  {
    text: "Tasks",
    to: "/dashboard/tasks",
    icon: faTasks,
  },
  {
    text: "Team",
    to: "/dashboard/team",
    icon: faUsers,
  },
];

const trashLink = {
  text: "Trash",
  to: "/dashboard/trashed",
  icon: faTrashAlt,
};

export default function DashboardSideNav() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <nav className="w-full max-w-[300px] min-h-full border flex flex-col items-start justify-between bg-red text-text-color-3 font-sans pl-6 text-xl">
      <div className="w-full">
        <h1 className="flex items-center gap-2 py-4">
          <span className="bg-blue-600 p-2 rounded-full">
            <FontAwesomeIcon icon={faBars} className="text-white text-2xl" />
          </span>
          <span className="text-2xl font-bold text-black">TaskMe</span>
        </h1>

        <div className="flex-1 flex flex-col gap-y-5 py-8 w-full">
          {sidebarContent.map(({ text, to, icon }) => (
            <Link
              key={text}
              to={to}
              className={clsx(
                "w-full flex gap-2 px-3 py-2 rounded-full items-center text-gray-800 text-base hover:bg-blue-100",
                currentPath === to ? "bg-blue-700 text-white" : ""
              )}
            >
              <FontAwesomeIcon icon={icon} />
              <span>{text}</span>
            </Link>
          ))}
        </div>

        <div className="w-full px-3 py-2 flex gap-2 items-center cursor-pointer text-lg text-gray-800 hover:bg-blue-100 rounded-full">
          <FontAwesomeIcon icon={faCog} />
          <span>Settings</span>
        </div>

        <div className="w-full">
          <ProjectNavComponents />
        </div>
      </div>

      <div className="w-full px-3 py-2 flex gap-2 items-center cursor-pointer text-lg text-gray-800 hover:bg-red-200 rounded-full mb-4">
        <FontAwesomeIcon icon={trashLink.icon} />
        <Link
          to={trashLink.to}
          className={clsx(
            "w-full flex gap-2 items-center text-gray-800 text-base hover:text-red-500",
            currentPath === trashLink.to ? "bg-red-700 text-white" : ""
          )}
        >
          {trashLink.text}
        </Link>
      </div>
    </nav>
  );
}
