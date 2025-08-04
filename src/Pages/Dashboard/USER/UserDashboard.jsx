import React from "react";
import { FaShoppingCart, FaUser, FaHeart, FaHistory } from "react-icons/fa";

export default function UserDashboard() {
  const stats = [
    {
      title: "Total Orders",
      value: "12",
      icon: <FaShoppingCart className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Pending Orders",
      value: "2",
      icon: <FaShoppingCart className="w-6 h-6" />,
      color: "bg-yellow-500",
    },
    {
      title: "Favorite Items",
      value: "8",
      icon: <FaHeart className="w-6 h-6" />,
      color: "bg-red-500",
    },
    {
      title: "Total Spent",
      value: "$156.80",
      icon: <FaHistory className="w-6 h-6" />,
      color: "bg-green-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your order summary</p>
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
          <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <FaShoppingCart className="mr-2" />
            View My Orders
          </button>
          <button className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <FaUser className="mr-2" />
            Update Profile
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="space-y-3">
          {[
            { id: 1001, items: 3, total: 45.50, status: "Delivered" },
            { id: 1002, items: 2, total: 28.00, status: "In Progress" },
            { id: 1003, items: 1, total: 15.99, status: "Pending" },
          ].map((order) => (
            <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Order #{order.id}</p>
                <p className="text-sm text-gray-600">{order.items} items • ${order.total}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                order.status === "Delivered" 
                  ? "bg-green-100 text-green-800"
                  : order.status === "In Progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 