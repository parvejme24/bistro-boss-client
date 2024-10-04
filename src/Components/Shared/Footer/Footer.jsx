import React from "react";
import {
  FaAngleDoubleRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="bg-[#010F1C]">
      <div className="container mx-auto px-3 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-10">
          <div className="lg:col-span-2">
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/logo/logoWhite.svg"
              alt="logo"
              className="mb-5"
            />
            <p className="text-gray-200">
              Phasellus ultricies aliquam volutpat ullamcorper laoreet neque, a
              lacinia curabitur lacinia mollis
            </p>
            <ul className="flex items-center gap-3 mt-5">
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
            <h3 className="text-2xl text-white font-bold">Quick Links</h3>
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

          {/* our menu  */}
          <div>
            <h3 className="text-2xl text-white font-bold">Our Menu</h3>
            <ul className="space-y-2 mt-5">
              <li>
                <Link
                  to={""}
                  className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
                >
                  <MdKeyboardDoubleArrowRight className="text-[25px]" />
                  Burger Kink
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
                >
                  <MdKeyboardDoubleArrowRight className="text-[25px]" />
                  Pizza King
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
                >
                  <MdKeyboardDoubleArrowRight className="text-[25px]" />
                  Fresh Food
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
                >
                  <MdKeyboardDoubleArrowRight className="text-[25px]" />
                  Vegetable
                </Link>
              </li>
              <li>
                <Link
                  to={""}
                  className="text-white flex items-center gap-1 font-bold hover:text-[#F02A1E] hover:ml-2 duration-300"
                >
                  <MdKeyboardDoubleArrowRight className="text-[25px]" />
                  Desserts
                </Link>
              </li>
            </ul>
          </div>

          {/* contact us  */}
          <div>
            <h3 className="text-2xl text-white font-bold">Our Menu</h3>

            <div className="space-y-2">
              <p className="font-bold space-x-1 mt-5 hover:ml-2 duration-300">
                <span className="text-[#596574]">Monday - Friday:</span>
                <span className="text-[#FC6C1B]">8am - 4pm</span>
              </p>
              <p className="font-bold space-x-1  hover:ml-2 duration-300">
                <span className="text-[#596574]">Saturday:</span>
                <span className="text-[#FC6C1B]">8am - 12pm</span>
              </p>
            </div>

            <div className="flex items-center mt-10">
              <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                className="px-4 py-3 rounded-lg w-full"
              />
              <button className="bg-orange-500 p-3 rounded-xl text-white -ml-[45px]">
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
