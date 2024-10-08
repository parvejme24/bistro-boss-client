import React from "react";
import { TfiReload } from "react-icons/tfi";

export const Captcha = ({
  captcha,
  setCaptchaInput,
  isCaptchaValid,
  refreshCaptcha,
  captchaInput,
}) => {
  return (
    <div className="space-y-1">
      <label className="text-sm">Captcha</label>
      <div className="flex items-center">
        <div className="bg-gray-100 px-4 py-3 w-full rounded border border-gray-300 text-center">
          {captcha}
        </div>
        <button
          type="button"
          className="-ml-1 text-lg p-4 bg-red-600 hover:bg-red-700 duration-300 rounded text-white"
          onClick={refreshCaptcha}
        >
          <TfiReload />
        </button>
      </div>

      <input
        type="text"
        name="captchaInput"
        placeholder="Enter Captcha"
        className={`px-4 py-3 w-full rounded border ${
          isCaptchaValid
            ? "border-gray-300"
            : "border-red-500 focus:border-red-500"
        } mt-2`}
        value={captchaInput}
        onChange={(e) => setCaptchaInput(e.target.value)}
      />
      {!isCaptchaValid && captchaInput !== "" && (
        <p className="text-red-500 text-xs">Invalid captcha</p>
      )}
    </div>
  );
};
