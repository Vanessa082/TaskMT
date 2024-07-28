import { Outlet } from "react-router-dom";
import DashboardSideNav from "../../Component/specific/dashboard-side-nav/dashboard-side-nav";

export default function DashboardWrapper() {
  return (
    <div className="flex flex-row w-full items-stretch min-h-screen">
      <DashboardSideNav />

      <div className="w-full h-full">
        <Outlet />
      </div>
    </div>
  );
}
