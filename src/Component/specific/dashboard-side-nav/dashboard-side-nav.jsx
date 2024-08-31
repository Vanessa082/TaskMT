import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAdd,
  faCalendarAlt,
  faCog,
  faHome,
  faSignOutAlt,
  faTasks,
  faThLarge,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import clsx from "clsx";
import { Link , useNavigate} from "react-router-dom";
import { useModalContext } from "../../../providers/context/modal-context";
import { TextLogo } from "../../ui/text-logo";
import { toast } from "sonner";
import { useAppContext } from "../../../providers/context/app-context";

const sidebarContent = [
  {
    text: "Home",
    to: "/",
    icon: faHome,
  },
  {
    text: "Dashboard",
    to: "/dashboard",
    icon: faThLarge,
  },

  {
    text: "Tasks",
    to: "/tasks",
    icon: faTasks,
  },
];

export default function DashboardSideNav({ isOpen, closeSidebar }) {
  const { projectModalOpen, setProjectModalOpen } = useModalContext();
  const { setCurrentUser } = useAppContext();

  const navigate = useNavigate()

  const handleOpenModal = () => {
    setProjectModalOpen(true);
    closeSidebar();
  };

  const handleLogOut = async () => {
    try {
      await fetch('/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout failed', error);
    }
    localStorage.removeItem("token");
    setCurrentUser(null);
    toast.success('Logged out! Redirecting to Homepage ...');
    navigate("/");
  };
  
  return (
    <>
      {
        isOpen && (
          <div
            className="fixed inset-0 z-10 w-full h-full"
            onClick={closeSidebar}
          />
        )
      }

      <div
        className={`fixed top-0 left-0 h-full z-20 w-64  bg-accent-color shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className=" gap-3  p-4 cursor-pointer">
          <div onClick={closeSidebar} className=" flex justify-between text-xl">
            <Link to="/">
              <TextLogo />
            </Link>
            <FontAwesomeIcon icon={faTimes} className="text-background-color" />
          </div>
        </div>
        {/* Sidebar content goes here */}

        <nav className="w-full max-w-[300px] min-h-full flex flex-col items-start justify-between px-6  text-xl">
          <div className="w-full">
            <div className="flex-1 flex flex-col gap-y-5 py-8">
              {sidebarContent.map(({ text, to, icon }) => (
                <Link
                  key={text}
                  to={to}
                  className={clsx(
                    "w-full flex gap-2 px-3 py-2 rounded-full items-center text-background-color font-sans text-base hover:text-primary-color hover:bg-background-color"
                  )}
                  onClick={closeSidebar}
                >
                  <FontAwesomeIcon icon={icon} />
                  <span>{text}</span>
                </Link>
              ))}
            </div>

            <Link to={"/dashboard/projects"} onClick={closeSidebar}>
              <div className="w-full flex gap-2 px-3 py-2 rounded-full items-center text-background-color font-sans text-base hover:text-primary-color hover:bg-background-color cursor-pointer">
                Manage Projects
              </div>
            </Link>

            <div onClick={handleOpenModal} className="w-full flex gap-2 px-3 py-2 rounded-full items-center text-background-color font-sans text-base hover:text-primary-color hover:bg-background-color cursor-pointer">
              <FontAwesomeIcon icon={faAdd} />
              Add Projects
            </div>

            <div className="w-full flex gap-2 px-3 py-2 rounded-full items-center text-background-color font-sans text-base hover:text-primary-color hover:bg-background-color cursor-pointer">
              <FontAwesomeIcon icon={faCalendarAlt} />
              <span>Calendar</span>
            </div>

            <div className="w-full flex gap-2 px-3 py-2 rounded-full items-center text-background-color font-sans text-base hover:text-primary-color hover:bg-background-color cursor-pointer">
              <FontAwesomeIcon icon={faCog} />
              <span>Settings</span>
            </div>
          <div className="w-full flex gap-2  px-3 py-2 text-background-color hover:text-accent-color rounded-full items-center font-sans text-base hover:bg-background-color cursor-pointe" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faSignOutAlt} className="text-primary-color"/>
           <span> Logout</span>
          </div>
          </div>

        </nav>
      </div>
    </>
  );
}
