import React from "react";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";

export const SocialLogin = () => {
  return (
    <div className="flex justify-center gap-3">
      <button className="p-2 rounded-full border border-black hover:border-[#D1A054] hover:text-white hover:bg-[#D1A054] duration-300">
        <FaGoogle />
      </button>
      <button className="p-2 rounded-full border border-black hover:border-[#D1A054] hover:text-white hover:bg-[#D1A054] duration-300">
        <FaFacebook />
      </button>
      <button className="p-2 rounded-full border border-black hover:border-[#D1A054] hover:text-white hover:bg-[#D1A054] duration-300">
        <FaGithub />
      </button>
    </div>
  );
};
