import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import InputField from "./InputField";
import { SocialLogin } from "../../LoginPage/LoginComponents/SocialLogin";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // enables form validation as user types
  });

  useEffect(() => {
    setIsButtonEnabled(isValid);
  }, [isValid]);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // handle form submission logic (e.g., API call)
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <h2 className="text-2xl font-bold pb-5 text-center">Sign Up</h2>

      <InputField
        label="Name"
        type="text"
        placeholder="Type Full Name"
        name="fullName"
        register={register}
        validation={{
          required: "Full Name is required",
          minLength: {
            value: 3,
            message: "Minimum 3 characters required",
          },
        }}
        error={errors.fullName}
      />

      <InputField
        label="Email"
        type="email"
        placeholder="Type Email"
        name="email"
        register={register}
        validation={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Enter a valid email address",
          },
        }}
        error={errors.email}
      />

      <InputField
        label="Password"
        type="password"
        placeholder="Enter Your Password"
        name="password"
        register={register}
        validation={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Minimum 6 characters required",
          },
        }}
        error={errors.password}
        togglePasswordVisibility={togglePasswordVisibility}
        showPassword={showPassword}
      />

      <input
        type="submit"
        value="Sign Up"
        disabled={!isButtonEnabled}
        className={`text-center w-full py-3 text-white rounded cursor-pointer transition duration-300 ${
          isButtonEnabled ? "bg-[#D1A054] hover:bg-red-700" : "bg-gray-300"
        }`}
      />

      <p className="text-center text-sm text-[#D1A054]">
        Already registered?{" "}
        <Link to={"/login"} className="font-bold hover:underline duration-300">
          Go to login page
        </Link>
      </p>

      <span className="text-sm text-center block">Or sign up with</span>

      <SocialLogin />
    </form>
  );
}
