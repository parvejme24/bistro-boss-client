import React, { useState, useEffect, useRef, useContext } from "react";
import { FaHeart, FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Avatar from "../../../Shared/Avatar/Avatar";

// NavItem Component
const NavItem = ({ link, toggleMenu }) => {
  const path = link === "Home" ? "/" : `/${link.toLowerCase()}`;
  return (
    <li className="mx-4 my-2 lg:my-0 mb-2">
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive
            ? "text-white font-bold px-3 py-2 border-l-4 border-red-600 rounded-md lg:border-none lg:rounded-none lg:p-0 bg-gradient-to-r from-red-600 to-[#010F1C] w-full block lg:flex"
            : "hover:text-white transition-colors px-3 py-2 border border-l-4 rounded-md border-[#f336367a] lg:p-0 lg:border-none lg:rounded-none hover:bg-gradient-to-r from-red-600 to-[#010F1C] block lg:flex"
        }
        onClick={toggleMenu}
      >
        {link}
      </NavLink>
    </li>
  );
};

export default function MainNav() {
  const { user, logout, loading, isInitialized } = useContext(AuthContext);

  // Show loading state while checking authentication
  if (loading && !isInitialized) {
    return (
      <div className="bg-[#050F20] text-white sticky top-0 z-[9999]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              <span>Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = async () => {
    try {
      await logout();
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false); // Close the menu if clicking outside
        setDropdownOpen(false); // Close dropdown if clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#010F1C] to-[#090F25] text-white border-b border-red-900 sticky top-0 z-[9999] shadow-lg" style={{ position: 'sticky', top: 0 }}>
      <div className="container mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-white">
              Bistro <span className="text-red-500">Boss</span>
            </h2>
          </div>

          {/* Nav Links for all devices */}
          <div className="mx-auto flex justify-center items-center">
            <ul
              ref={menuRef}
              className={`lg:flex items-center gap-5 absolute lg:static top-[80px] left-1/2 transform -translate-x-1/2 w-full lg:w-auto bg-[#010f1cf8] transition-all duration-300 ease-in-out ${
                isOpen ? "block" : "hidden"
              } lg:block`}
              style={{ zIndex: 9998 }}
            >
              {["Home", "About", "Menu", "Chef", "Contact", "Blog"].map(
                (link) => (
                  <NavItem
                    key={link}
                    link={link}
                    toggleMenu={() => setIsOpen(false)}
                  />
                )
              )}
            </ul>
          </div>
          
          {/* Icons and CTA */}
          <div className="space-x-4 flex items-center relative">
            <button className="border border-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white transition-transform duration-300 transform hover:scale-110 shadow-md">
              <FaHeart size={18} />
            </button>
            <button className="border border-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white transition-transform duration-300 transform hover:scale-110 shadow-md">
              <FaCartShopping size={18} />
            </button>

            {/* User Avatar and Dropdown */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div className="px-1 py-1.5 border border-red-600 rounded-lg flex justify-center items-center hover:bg-red-600 hover:border-red-500 transition-all duration-300 cursor-pointer" onClick={toggleDropdown}>
                  <div className="w-[35px] h-[30px] flex justify-center items-center">
                    <Avatar
                      user={user}
                      size="sm"
                      borderColor="border-white"
                      className="border-2"
                    />
                  </div>
                </div>

                {/* Enhanced Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-[#050F20] border border-[#f73b3b56] rounded-md shadow-lg z-[9999] text-white">
                    <div className="p-4 border-b border-[#f73b3b56]">
                      <div className="flex items-center space-x-3">
                        <Avatar
                          user={user}
                          size="lg"
                          borderColor="border-red-600"
                          className="border-2"
                        />
                        <div>
                          <p className="font-bold text-lg">
                            {user.name || user.displayName || "User"}
                          </p>
                          <p className="text-sm text-gray-300">{user.email}</p>
                          <p className="text-xs text-red-400 capitalize">
                            {(user.role || "customer").toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <ul className="p-2 space-y-1">
                      <li>
                        <NavLink
                          to={`/dashboard/${user.role}/profile`}
                          className={({ isActive }) =>
                            isActive
                              ? "text-white font-bold px-3 py-3 border-l-4 border-red-600 rounded-md bg-gradient-to-r from-red-600 to-[#010F1C] w-full block"
                              : "hover:text-white transition-colors px-3 py-3 border border-l-4 rounded-md border-[#f336367a] hover:bg-gradient-to-r from-red-600 to-[#010F1C] block"
                          }
                          onClick={() => setDropdownOpen(false)}
                        >
                          👤 Profile
                        </NavLink>
                      </li>
                      {user.role === "customer" ? (
                        <li>
                          <NavLink
                            to={`/dashboard/${user.role}/orders`}
                            className={({ isActive }) =>
                              isActive
                                ? "text-white font-bold px-3 py-3 border-l-4 border-red-600 rounded-md bg-gradient-to-r from-red-600 to-[#010F1C] w-full block"
                                : "hover:text-white transition-colors px-3 py-3 border border-l-4 rounded-md border-[#f336367a] hover:bg-gradient-to-r from-red-600 to-[#010F1C] block"
                            }
                            onClick={() => setDropdownOpen(false)}
                          >
                            📋 My Orders
                          </NavLink>
                        </li>
                      ) : user.role === "chef" ? (
                        <li>
                          <NavLink
                            to={`/dashboard/${user.role}/menu`}
                            className={({ isActive }) =>
                              isActive
                                ? "text-white font-bold px-3 py-3 border-l-4 border-red-600 rounded-md bg-gradient-to-r from-red-600 to-[#010F1C] w-full block"
                                : "hover:text-white transition-colors px-3 py-3 border border-l-4 rounded-md border-[#f336367a] hover:bg-gradient-to-r from-red-600 to-[#010F1C] block"
                            }
                            onClick={() => setDropdownOpen(false)}
                          >
                            🍽️ Menu Management
                          </NavLink>
                        </li>
                      ) : user.role === "admin" ? (
                        <li>
                          <NavLink
                            to={`/dashboard/${user.role}/users`}
                            className={({ isActive }) =>
                              isActive
                                ? "text-white font-bold px-3 py-3 border-l-4 border-red-600 rounded-md bg-gradient-to-r from-red-600 to-[#010F1C] w-full block"
                                : "hover:text-white transition-colors px-3 py-3 border border-l-4 rounded-md border-[#f336367a] hover:bg-gradient-to-r from-red-600 to-[#010F1C] block"
                            }
                            onClick={() => setDropdownOpen(false)}
                          >
                            👥 User Management
                          </NavLink>
                        </li>
                      ) : null}
                      <li>
                        <NavLink
                          to={`/dashboard/${user.role}`}
                          className={({ isActive }) =>
                            isActive
                              ? "text-white font-bold px-3 py-3 border-l-4 border-red-600 rounded-md bg-gradient-to-r from-red-600 to-[#010F1C] w-full block"
                              : "hover:text-white transition-colors px-3 py-3 border border-l-4 rounded-md border-[#f336367a] hover:bg-gradient-to-r from-red-600 to-[#010F1C] block"
                          }
                          onClick={() => setDropdownOpen(false)}
                        >
                          🏠 Dashboard
                        </NavLink>
                      </li>
                      <li className="pt-2">
                        <button
                          onClick={() => {
                            handleLogout();
                            setDropdownOpen(false);
                          }}
                          disabled={loading}
                          className="w-full text-left bg-red-600 text-white hover:bg-red-800 px-3 py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                        >
                          {loading ? "🔄 Logging out..." : "🚪 Logout"}
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="border border-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white transition-transform duration-300 transform hover:scale-110 shadow-md"
                  onClick={toggleDropdown}
                  disabled={loading}
                >
                  <FaUserAlt size={18} />
                </button>

                {/* Guest User Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[#050F20] border border-[#f73b3b56] rounded-md shadow-lg z-[9999] text-white">
                    <ul className="p-2 space-y-1">
                      <li>
                        <Link
                          to="/login"
                          className="block px-3 py-3 text-white hover:bg-red-600 rounded-md transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          🔐 Login
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/register"
                          className="block px-3 py-3 text-white hover:bg-red-600 rounded-md transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          📝 Register
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Toggle Button */}
            <div className="lg:hidden ml-4">
              <button
                onClick={toggleMenu}
                className="transition-transform duration-300 transform hover:scale-110"
              >
                {isOpen ? (
                  <FaTimes size={24} className="text-red-600" />
                ) : (
                  <FaBars size={24} className="text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
