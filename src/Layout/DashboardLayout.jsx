import React from "react";
import Topbar from "../Pages/Dashboard/Topbar";
import Sidebar from "../Pages/Dashboard/Sidebar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <Topbar />
      <Sidebar />
      <Outlet />
    </div>
  );
}
