import React from "react";
import { FaUtensils, FaPlus, FaEdit, FaChartLine } from "react-icons/fa";

export default function ChefDashboard() {
  const stats = [
    {
      title: "Total Menu Items",
      value: "45",
      icon: <FaUtensils className="w-6 h-6" />,
      color: "bg-orange-500",
    },
    {
      title: "Active Items",
      value: "38",
      icon: <FaUtensils className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      title: "Today's Orders",
      value: "23",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Pending Orders",
      value: "7",
      icon: <FaChartLine className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Chef Dashboard</h1>
        <p className="text-gray-600">Manage your menu and track orders</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="flex items-center justify-center px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
            <FaPlus className="mr-2" />
            Add New Menu Item
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaEdit className="mr-2" />
            Manage Menu
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((order) => (
            <div key={order} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Order #{1000 + order}</p>
                <p className="text-sm text-gray-600">2 items • $24.50</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                Pending
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 