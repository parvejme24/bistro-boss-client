import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import LOGIN_IMAGE from "../../assets/login.png";
import LOGIN_BG from "../../assets/login-bg.png";
import { Link } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { FaGoogle } from "react-icons/fa6";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const { createUser } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  // initialize the form using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // onChange enables real-time validation
  });

  // handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;
      console.log(loggedUser);
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Register Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };

  // toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${LOGIN_BG})`,
      }}
    >
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <div className="max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-10 bg-white bg-opacity-60 p-10 rounded-lg shadow-md mx-5 lg:mx-0">
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <h2 className="text-2xl font-bold pb-5 text-center">Sign Up</h2>

              {/* name input */}
              <div className="space-y-1">
                <label className="text-sm">Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Type Full Name"
                  className="px-4 py-3 w-full rounded border border-gray-300"
                  {...register("fullName", {
                    required: "Full Name is required",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required",
                    },
                  })}
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* email input */}
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
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* password input */}
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
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* submit button */}
              <input
                type="submit"
                value="Sign Up"
                className={`text-center w-full py-3 text-white rounded cursor-pointer transition duration-300 ${
                  isValid
                    ? "bg-[#D1A054] hover:bg-red-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isValid}
              />

              {/* redirect to login */}
              <p className="text-center text-sm text-[#D1A054]">
                Already registered?{" "}
                <Link
                  to={"/login"}
                  className="font-bold hover:underline duration-300"
                >
                  Go to login page
                </Link>
              </p>

              <span className="text-sm text-center block">Or sign up with</span>

              {/* social login */}
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
            </form>
          </div>

          {/* login image */}
          <div className="hidden md:flex justify-center items-center">
            <img src={LOGIN_IMAGE} alt="Login" className="w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
