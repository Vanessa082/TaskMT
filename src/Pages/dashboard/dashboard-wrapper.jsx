import { Outlet } from "react-router-dom";
// import DashboardSideNav from "../../Component/specific/dashboard-side-nav/dashboard-side-nav";
// import TaskCreationContainer from "./task/task-creation-container";
// import Notificationss from "./notification/notification";
// import Search from "./search";
import DashboardNavbar from "../../Component/specific/dashboard-side-nav/DashboardNavbar";

export default function DashboardWrapper() {
  return (
    <div className="flex flex-col  min-h-screen">
      {/* <DashboardSideNav /> */}
      <DashboardNavbar />

      <div className="w-full flex flex-col justify-start gap-4 bg-secondary-color pt-5 px-4 min-h-[95vh]">
        <div className="flex justify-end gap-10 text-text-color-3 font-sans pr-6 text-xl">
          
          {/* <Search /> */}
          {/* <Notificationss /> */}
        </div>
        {/* <TaskCreationContainer /> */}
        <Outlet />
      </div>
    </div>
  );
}
