import { Outlet } from "react-router-dom";
import DashboardSidebar from "../Components/Shared/DashboardSidebar/DashboardSidebar";

export default function DashboardLayout() {
  return (
    <div>
      <DashboardSidebar />
      <Outlet />
    </div>
  );
}
