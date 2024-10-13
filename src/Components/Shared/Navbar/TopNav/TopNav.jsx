import React from "react";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TopNav() {
  return (
    <div className="bg-[#EB0029] py-2">
      <div className="container mx-auto">
        <div className="flex justify-end items-center gap-5">
          <p className="text-[#F7BFD4]">Follow Us:</p>
          <ul className="text-[#F7BFD4] flex items-center gap-3">
            <li>
              <Link to={""}>
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link to={""}>
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link to={""}>
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link to={""}>
                <FaFacebook />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
