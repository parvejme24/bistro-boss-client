import React, { useState, useEffect, useRef } from "react";
import { FaHeart, FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

// NavItem Component
const NavItem = ({ link, toggleMenu }) => (
  <li className="mx-4 my-2 lg:my-0 mb-2">
    <NavLink
      to={`/${link.toLowerCase()}`}
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

export default function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu if clicking outside
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
              className="w-32"
            />
          </div>

          {/* Nav Links for all devices */}
          <ul
            ref={menuRef}
            className={`lg:flex items-center gap-5 absolute lg:static top-[80px] left-0 w-full lg:w-auto bg-[#010f1cf8] transition-all duration-300 ease-in-out ${
              isOpen ? "block" : "hidden"
            } lg:block`}
          >
            {["Home", "About", "Menu", "Contact", "Blog", "Shop"].map(
              (link) => (
                <NavItem
                  key={link}
                  link={link}
                  toggleMenu={() => setIsOpen(false)}
                />
              )
            )}
          </ul>

          {/* Icons and CTA */}
          <div className="space-x-4 flex items-center">
            <button className="border border-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white transition-transform duration-300 transform hover:scale-110 shadow-md">
              <FaHeart size={18} />
            </button>
            <button className="border border-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white transition-transform duration-300 transform hover:scale-110 shadow-md">
              <FaCartShopping size={18} />
            </button>
            <button className="border border-red-600 p-3 rounded-lg hover:bg-red-600 hover:text-white transition-transform duration-300 transform hover:scale-110 shadow-md">
              <FaUserAlt size={18} />
            </button>
            <button className="hidden lg:flex bg-[#EB0029] px-5 py-3 rounded-lg hover:bg-red-800 transition duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Login Now
            </button>

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

