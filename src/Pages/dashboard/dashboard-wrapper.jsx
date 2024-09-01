import { Outlet } from "react-router-dom";
import DashboardSideNav from "../../Component/specific/dashboard-side-nav/dashboard-side-nav";
import DashboardNavbar from "../../Component/specific/dashboard-side-nav/DashboardNavbar";
import { useState } from "react";

export default function DashboardWrapper() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <DashboardSideNav isOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      
      <div className={`flex flex-col justify-start gap-4 bg-secondary-color pt-5 px-4 min-h-[95vh] transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "w-[80%]" : "w-full"
        }`}>
        <DashboardNavbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <Outlet />
      </div>
    </div>
  );
}
