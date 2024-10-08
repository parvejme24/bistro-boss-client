import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function InputField({
  label,
  type,
  placeholder,
  name,
  register,
  validation,
  error,
  togglePasswordVisibility,
  showPassword,
}) {
  return (
    <div className="space-y-1 relative">
      <label className="text-sm">{label}</label>
      <input
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        className="px-4 py-3 w-full rounded border border-gray-300"
        {...register(name, validation)}
      />
      {type === "password" && (
        <span
          className="absolute right-4 top-10 cursor-pointer text-gray-500"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <IoEyeOffOutline className="text-xl" />
          ) : (
            <IoEyeOutline className="text-xl" />
          )}
        </span>
      )}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}
