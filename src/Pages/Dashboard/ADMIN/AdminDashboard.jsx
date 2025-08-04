import React from "react";
import { FaBlog, FaUsers, FaShoppingCart, FaChartLine } from "react-icons/fa";

export default function AdminDashboard() {
  const stats = [
    {
      title: "Total Blogs",
      value: "24",
      icon: <FaBlog className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Total Users",
      value: "156",
      icon: <FaUsers className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      title: "Total Orders",
      value: "89",
      icon: <FaShoppingCart className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      title: "Revenue",
      value: "$12,450",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.color} text-white p-3 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaBlog className="mr-2" />
            Add New Blog
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <FaUsers className="mr-2" />
            Manage Users
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
            <FaShoppingCart className="mr-2" />
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
} 