import { Outlet } from "react-router-dom";
// import DashboardSideNav from "../../Component/specific/dashboard-side-nav/dashboard-side-nav";
import TaskCreationContainer from "./task/task-creation-container";
import Notificationss from "./notification/notification";
import AddTask from "./task/add-task";
import Search from "./search";

export default function DashboardWrapper() {
  return (
    <div className="flex flex-row w-full items-stretch min-h-screen">
      {/* <DashboardSideNav /> */}

      <div className="w-full flex flex-col justify-start gap-4 bg-linear-gradient-top-white pt-5">
        <div className="flex justify-end gap-10 text-text-color-3 font-sans pr-6 text-xl">
          <AddTask />
          <Search />
          <Notificationss />
        </div>
        <TaskCreationContainer />
        <Outlet />
      </div>
    </div>
  );
}
