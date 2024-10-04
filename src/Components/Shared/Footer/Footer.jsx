import React from "react";
import {
  FaAngleDoubleRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#010F1C]">
      <div className="container mx-auto">
        <div>
          <p className="text-gray-200">
            Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a
            lacinia curabitur lacinia mollis
          </p>
          <ul className="flex items-center gap-3">
            <li>
              <Link
                className="text-white p-2 hover:bg-[#F02425] duration-300 inline-block border border-gray-500"
                to="https://www.facebook.com/"
                target="_blank"
              >
                <FaFacebookF />
              </Link>
            </li>
            <li>
              <Link
                className="text-white p-2 hover:bg-[#F02425] duration-300 inline-block border border-gray-500"
                to="https://www.facebook.com/"
                target="_blank"
              >
                <FaTwitter />
              </Link>
            </li>
            <li>
              <Link
                className="text-white p-2 hover:bg-[#F02425] duration-300 inline-block border border-gray-500"
                to="https://www.facebook.com/"
                target="_blank"
              >
                <FaYoutube />
              </Link>
            </li>
            <li>
              <Link
                className="text-white p-2 hover:bg-[#F02425] duration-300 inline-block border border-gray-500"
                to="https://www.facebook.com/"
                target="_blank"
              >
                <FaInstagram />
              </Link>
            </li>
          </ul>
        </div>

        {/* quick links  */}
        <div>
          <h3 className="text-2xl text-white">Quick Links</h3>
          <ul className="space-y-2 mt-5">
            <li>
              <Link
                to={""}
                className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
              >
                <MdKeyboardDoubleArrowRight className="text-[25px]" />
                About Us
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
              >
                <MdKeyboardDoubleArrowRight className="text-[25px]" />
                Our Gallery
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
              >
                <MdKeyboardDoubleArrowRight className="text-[25px]" />
                Our Blogs
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
              >
                <MdKeyboardDoubleArrowRight className="text-[25px]" />
                FAQ'S
              </Link>
            </li>
            <li>
              <Link
                to={""}
                className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
              >
                <MdKeyboardDoubleArrowRight className="text-[25px]" />
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
