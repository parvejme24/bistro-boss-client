import React from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export const PasswordInput = ({
  register,
  errors,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <div className="space-y-1 relative">
      <label className="text-sm">Password</label>
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Enter Your Password"
        className="px-4 py-3 w-full rounded border border-gray-300"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum 6 characters required",
          },
        })}
      />
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
      {errors.password && (
        <p className="text-red-500 text-xs">{errors.password.message}</p>
      )}
    </div>
  );
};
