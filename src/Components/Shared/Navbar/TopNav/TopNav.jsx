import React, { useContext } from "react";
import { FaClock, FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Provider/AuthProvider";

export default function TopNav() {
  const { user } = useContext(AuthContext);

  return (
    <div className="bg-[#EB0029] relative z-[9998]">
      <div className="container mx-auto max-w-7xl px-4 lg:px-5 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center">
          <p className="text-[#F7BFD4] flex items-center gap-2 text-sm lg:text-base">
            <FaClock className="text-xs lg:text-sm" /> 
            <span className="hidden sm:inline">09:00 am - 06:00 pm</span>
            <span className="sm:hidden">09:00 - 18:00</span>
          </p>
        </div>
        
        <div className="flex items-center gap-2 lg:gap-5 flex-wrap">
          {user && (
            <div className="text-[#F7BFD4] flex items-center gap-2 text-sm lg:text-base">
              <span className="hidden md:inline">Welcome,</span>
              <span className="font-semibold truncate max-w-[80px] sm:max-w-[120px] lg:max-w-none">
                {user.name || user.displayName || "User"}
              </span>
            </div>
          )}
          
          <div className="flex items-center gap-2 lg:gap-3">
            <p className="text-[#F7BFD4] text-sm lg:text-base hidden md:inline">Follow Us:</p>
            <ul className="text-[#F7BFD4] flex items-center gap-1 sm:gap-2 lg:gap-3">
              <li>
                <Link to={""} className="hover:text-white transition-colors p-1">
                  <FaFacebook className="text-xs sm:text-sm lg:text-base" />
                </Link>
              </li>
              <li>
                <Link to={""} className="hover:text-white transition-colors p-1">
                  <FaTwitter className="text-xs sm:text-sm lg:text-base" />
                </Link>
              </li>
              <li>
                <Link to={""} className="hover:text-white transition-colors p-1">
                  <FaYoutube className="text-xs sm:text-sm lg:text-base" />
                </Link>
              </li>
              <li>
                <Link to={""} className="hover:text-white transition-colors p-1">
                  <FaInstagram className="text-xs sm:text-sm lg:text-base" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
