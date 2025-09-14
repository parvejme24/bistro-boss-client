import React, { useState, useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";
import { 
  FaHome, 
  FaUser, 
  FaClipboardList, 
  FaUtensils, 
  FaUsers, 
  FaBlog, 
  FaCog, 
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChevronDown
} from "react-icons/fa";
import { MdDashboard, MdRestaurantMenu } from "react-icons/md";
import { BiSolidFoodMenu } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";
import Avatar from "../Avatar/Avatar";

const DashboardSidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState({});
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleMenu = (menuKey) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuKey]: !prev[menuKey]
    }));
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Define routes based on user role
  const getRoutesByRole = () => {
    if (!user) return [];

    const baseRoutes = [
      {
        key: "dashboard",
        label: "Dashboard",
        icon: <MdDashboard className="text-xl" />,
        path: `/dashboard/${user.role}`,
        exact: true
      }
    ];

    switch (user.role) {
      case "customer":
        return [
          ...baseRoutes,
          {
            key: "profile",
            label: "Profile",
            icon: <FaUser className="text-xl" />,
            path: "/dashboard/user/profile"
          },
          {
            key: "orders",
            label: "My Orders",
            icon: <FaClipboardList className="text-xl" />,
            path: "/dashboard/user/orders"
          },
          {
            key: "favorites",
            label: "Favorites",
            icon: <FaHome className="text-xl" />,
            path: "/dashboard/user/favorites"
          }
        ];

      case "chef":
        return [
          ...baseRoutes,
          {
            key: "profile",
            label: "Chef Profile",
            icon: <FaUser className="text-xl" />,
            path: "/dashboard/chef/profile"
          },
          {
            key: "menu",
            label: "Menu Management",
            icon: <MdRestaurantMenu className="text-xl" />,
            path: "/dashboard/chef/menu",
            children: [
              {
                key: "menu-list",
                label: "Menu List",
                path: "/dashboard/chef/menu/list"
              },
              {
                key: "add-menu",
                label: "Add Menu Item",
                path: "/dashboard/chef/menu/add"
              }
            ]
          },
          {
            key: "orders",
            label: "Orders",
            icon: <FaClipboardList className="text-xl" />,
            path: "/dashboard/chef/orders"
          },
          {
            key: "analytics",
            label: "Analytics",
            icon: <IoStatsChart className="text-xl" />,
            path: "/dashboard/chef/analytics"
          }
        ];

      case "admin":
        return [
          ...baseRoutes,
          {
            key: "users",
            label: "User Management",
            icon: <FaUsers className="text-xl" />,
            path: "/dashboard/admin/users"
          },
          {
            key: "orders",
            label: "All Orders",
            icon: <FaClipboardList className="text-xl" />,
            path: "/dashboard/admin/orders"
          },
          {
            key: "menu",
            label: "Menu Management",
            icon: <BiSolidFoodMenu className="text-xl" />,
            path: "/dashboard/admin/menu"
          },
          {
            key: "blogs",
            label: "Blog Management",
            icon: <FaBlog className="text-xl" />,
            path: "/dashboard/admin/blogs",
            children: [
              {
                key: "blog-list",
                label: "Blog List",
                path: "/dashboard/admin/blogs/list"
              },
              {
                key: "add-blog",
                label: "Add Blog",
                path: "/dashboard/admin/blogs/add"
              }
            ]
          },
          {
            key: "analytics",
            label: "Analytics",
            icon: <IoStatsChart className="text-xl" />,
            path: "/dashboard/admin/analytics"
          },
          {
            key: "settings",
            label: "Settings",
            icon: <FaCog className="text-xl" />,
            path: "/dashboard/admin/settings"
          }
        ];

      default:
        return baseRoutes;
    }
  };

  const routes = getRoutesByRole();

  const renderMenuItem = (item) => {
    const isActive = location.pathname === item.path;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus[item.key];

    if (hasChildren) {
      return (
        <div key={item.key} className="space-y-1">
          <button
            onClick={() => toggleMenu(item.key)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-50 hover:text-red-600 ${
              isActive ? "bg-red-100 text-red-600" : "text-gray-700"
            }`}
          >
            <div className="flex items-center space-x-3">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
            <FaChevronDown 
              className={`transition-transform duration-200 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
          
          {isExpanded && (
            <div className="ml-8 space-y-1">
              {item.children.map((child) => {
                const isChildActive = location.pathname === child.path;
                return (
                  <NavLink
                    key={child.key}
                    to={child.path}
                    className={`block px-4 py-2 rounded-lg transition-all duration-200 hover:bg-red-50 hover:text-red-600 ${
                      isChildActive ? "bg-red-100 text-red-600" : "text-gray-600"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {child.label}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.key}
        to={item.path}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-red-50 hover:text-red-600 ${
          isActive ? "bg-red-100 text-red-600" : "text-gray-700"
        }`}
        onClick={() => setIsOpen(false)}
      >
        {item.icon}
        <span className="font-medium">{item.label}</span>
      </NavLink>
    );
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-red-600 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white shadow-xl lg:shadow-none
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Avatar user={user} size="md" />
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 truncate">
                  {user?.name || user?.displayName || "User"}
                </h3>
                <p className="text-sm text-gray-500 capitalize">
                  {user?.role || "customer"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {routes.map(renderMenuItem)}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-3 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
