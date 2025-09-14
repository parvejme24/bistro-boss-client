import React from "react";
import { FiUser } from "react-icons/fi";

export default function Topbar() {
  return (
    <div className="w-full bg-red-100 px-5 py-3">
      <div className="flex justify-end items-center gap-2">
        <div className="text-right">
          <h4 className="font-bold">Hi, Md Parvej</h4>
          <p>mdparvej@gmail.com</p>
        </div>
        <div>
          <span className="block text-2xl border border-red-300 rounded-full p-2">
            <FiUser />
          </span>
        </div>
      </div>
    </div>
  );
}
