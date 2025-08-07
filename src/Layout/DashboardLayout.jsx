import React, { useState, useContext } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaBlog, FaUsers, FaShoppingCart, FaUtensils, FaUser, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

export default function DashboardLayout() {
  const { user, logOut, loading } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get user role from URL path
  const pathSegments = location.pathname.split('/');
  const userRole = pathSegments[2]; // dashboard/admin, dashboard/chef, dashboard/user

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await logOut();
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  // Navigation items based on user role
  const getNavigationItems = () => {
    switch (userRole) {
      case 'admin':
        return [
          { name: 'Dashboard', path: '/dashboard/admin', icon: <FaHome /> },
          { name: 'Blogs', path: '/dashboard/admin/blogs', icon: <FaBlog /> },
          { name: 'Orders', path: '/dashboard/admin/orders', icon: <FaShoppingCart /> },
          { name: 'Users', path: '/dashboard/admin/users', icon: <FaUsers /> },
        ];
      case 'chef':
        return [
          { name: 'Dashboard', path: '/dashboard/chef', icon: <FaHome /> },
          { name: 'Menu', path: '/dashboard/chef/menu', icon: <FaUtensils /> },
        ];
      case 'user':
        return [
          { name: 'Dashboard', path: '/dashboard/user', icon: <FaHome /> },
          { name: 'My Orders', path: '/dashboard/user/orders', icon: <FaShoppingCart /> },
          { name: 'Profile', path: '/dashboard/user/profile', icon: <FaUser /> },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">
            {userRole === 'admin' && 'Admin Dashboard'}
            {userRole === 'chef' && 'Chef Dashboard'}
            {userRole === 'user' && 'User Dashboard'}
          </h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="flex items-center w-full px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSignOutAlt className="mr-3" />
            {loading ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <FaBars className="w-5 h-5" />
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Welcome, {user?.name || (userRole === 'admin' ? 'Admin' : userRole === 'chef' ? 'Chef' : 'User')}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 