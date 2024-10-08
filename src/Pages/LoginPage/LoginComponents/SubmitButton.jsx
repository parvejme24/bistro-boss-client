import React from "react";

export const SubmitButton = ({ isButtonEnabled }) => {
  return (
    <input
      type="submit"
      value="Login"
      className={`text-center w-full bg-[#D1A054] py-3 text-white rounded cursor-pointer hover:bg-red-700 transition duration-300 ${
        isButtonEnabled ? "" : "opacity-50 cursor-not-allowed"
      }`}
      disabled={!isButtonEnabled}
    />
  );
};
