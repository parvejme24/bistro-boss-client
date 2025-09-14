import React from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
      <div className="w-60 min-h-screen border-r border-red-400">
        <ul>
          <li className="flex items-center gap-2">
            <MdSpaceDashboard className="text-2xl" /> Dashboard
          </li>
          <li className="flex items-center gap-2">
            <MdSpaceDashboard className="text-2xl" /> Profile
          </li>
          <li className="flex items-center gap-2">
            <MdSpaceDashboard className="text-2xl" /> Orders
          </li>
        </ul>
      </div>
    </div>
  );
}
