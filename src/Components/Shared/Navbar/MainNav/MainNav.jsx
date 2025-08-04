import React, { useState, useEffect, useRef, useContext } from "react";
import { FaHeart, FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";
import Swal from "sweetalert2";

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
  const { user, logOut } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    logOut().then(() => {
      Swal.fire({
        icon: "success",
        title: "Logged Out Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    });
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
    <div className="bg-gradient-to-br from-[#010F1C] to-[#090F25] text-white border-b border-red-900 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between py-5">
          {/* Logo */}
          <div>
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/logo/logoWhite.svg"
              alt="Logo"
              className="w-56"
            />
          </div>

          {/* Nav Links for all devices */}
          <div className="w-[100%] flex justify-center items-center">
            <ul
              ref={menuRef}
              className={`container mx-auto lg:flex items-center gap-5 absolute lg:static top-[80px] left-1/2 transform -translate-x-1/2 w-full lg:w-auto bg-[#010f1cf8] transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"
                } lg:block`}
            >
              {["Home", "About", "Menu", "Chef", "Contact", "Blog"].map((link) => (
                <NavItem
                  key={link}
                  link={link}
                  toggleMenu={() => setIsOpen(false)}
                />
              ))}
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

            {/* Dropdown for user */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="border border-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white transition-transform duration-300 transform hover:scale-110 shadow-md"
                onClick={toggleDropdown}
              >
                {user ? (
                  <img
                    src={user.photoURL || "path/to/default-avatar.png"} // Provide a default avatar path if no photo URL
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full inline-block"
                  />
                ) : (
                  <FaUserAlt size={18} />
                )}
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && user && (
                <div className="absolute right-0 mt-2 w-48 bg-[#050F20] border border-[#f73b3b56] rounded-md shadow-lg z-50 text-white">
                  <ul className="p-2 space-y-2">
                    <li className="text-center">
                      <p className="font-bold text-xl">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-sm">{user.email}</p>
                    </li>
                    {["Profile", "Orders"].map((item) => (
                      <li key={item}>
                        <NavLink
                          to={`/${item.toLowerCase()}`}
                          className={({ isActive }) =>
                            isActive
                              ? "text-white font-bold px-3 py-2 border-l-4 border-red-600 rounded-md bg-gradient-to-r from-red-600 to-[#010F1C] w-full block"
                              : "hover:text-white transition-colors px-3 py-2 border border-l-4 rounded-md border-[#f336367a] hover:bg-gradient-to-r from-red-600 to-[#010F1C] block"
                          }
                          onClick={() => setDropdownOpen(false)}
                        >
                          {item}
                        </NavLink>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left bg-red-600 text-white hover:bg-red-800 px-3 py-2 rounded-md transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {!user && (
              <Link to={"/login"}>
                <button className="hidden w-[120px] lg:flex bg-[#EB0029] px-5 py-3 rounded-lg hover:bg-red-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex justify-center items-center">
                  Login Now
                </button>
              </Link>
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
