import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <div className="bg-[#F4F1EA]">
        <div className="container mx-auto px-5 flex justify-center items-center min-h-screen">
          <div className="space-y-6">
            <img
              src="https://gramentheme.com/html/fresheat/assets/img/bg/error.png"
              alt=""
              className="mx-auto"
            />
            <h3 className="text-center text-2xl md:text-4xl font-bold">
              Sorry we cant find a page you’re looking for
            </h3>
            <span className="flex justify-center">
              <Link
                to={"/"}
                className="bg-[#EB0029] hover:bg-[#FC781A] duration-300 px-5 py-3 text-white inline"
              >
                Back To Home Page
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
