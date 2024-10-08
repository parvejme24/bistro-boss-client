import React from "react";

export const EmailInput = ({ register, errors }) => {
  return (
    <div className="space-y-1">
      <label className="text-sm">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Type Email"
        className="px-4 py-3 w-full rounded border border-gray-300"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        })}
      />
      {errors.email && (
        <p className="text-red-500 text-xs">{errors.email.message}</p>
      )}
    </div>
  );
};
