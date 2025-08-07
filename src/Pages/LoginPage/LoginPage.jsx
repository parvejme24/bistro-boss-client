import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { FaFacebook, FaGithub, FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Provider/AuthProvider";
import LOGIN_IMAGE from "../../assets/login.png";
import LOGIN_BG from "../../assets/login-bg.png";

const generateCaptcha = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let captcha = "";
  for (let i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
};

export default function LoginPage() {
  const { signIn, loading, error, success, clearAuthError, clearAuthSuccess } = useContext(AuthContext);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear errors and success messages on component mount
  useEffect(() => {
    clearAuthError();
    clearAuthSuccess();
  }, [clearAuthError, clearAuthSuccess]);

  // Handle success and error messages
  useEffect(() => {
    if (success && !loading) {
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to Bistro Boss!",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate("/");
      });
      clearAuthSuccess();
    }
  }, [success, loading, navigate, clearAuthSuccess]);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message || "Invalid email or password. Please try again.",
      });
      clearAuthError();
      setIsSubmitting(false);
    }
  }, [error, clearAuthError]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (captchaInput !== captcha) {
      Swal.fire({
        icon: "error",
        title: "Captcha Error",
        text: "Captcha is incorrect. Please try again.",
      });
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);
    try {
      const credentials = {
        email: data.email,
        password: data.password,
      };

      await signIn(credentials);
    } catch (error) {
      // Error is handled by the useEffect above
      console.error("Login error:", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  useEffect(() => {
    const email = watch("email");
    const password = watch("password");

    const isFormValid =
      !errors.email &&
      !errors.password &&
      email &&
      password &&
      captchaInput === captcha;

    setIsButtonEnabled(isFormValid);
    setIsCaptchaValid(captchaInput === captcha);
  }, [watch("email"), watch("password"), captchaInput, errors, captcha]);

  return (
    <div
      className="min-h-screen bg-[#F4F1EA] flex items-center justify-center"
      style={{
        backgroundImage: `url(${LOGIN_BG})`,
      }}
    >
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <div className="max-w-[1100px] grid grid-cols-1 md:grid-cols-2 gap-10 bg-white bg-opacity-60 p-10 rounded-lg shadow-md mx-5 lg:mx-0">
          {/* left side: login image */}
          <div className="hidden md:flex justify-center items-center">
            <img src={LOGIN_IMAGE} alt="Login" className="w-full" />
          </div>

          {/* right side: login form */}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <h2 className="text-2xl font-bold pb-5 text-center">Login</h2>

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
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
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
                  <p className="text-red-500 text-xs">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* captcha field */}
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

                {/* captcha input */}
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

              {/* submit button */}
              <input
                type="submit"
                value={isSubmitting ? "Logging In..." : "Login"}
                className={`text-center w-full bg-[#D1A054] py-3 text-white rounded cursor-pointer hover:bg-red-700 transition duration-300 ${
                  isButtonEnabled && !isSubmitting ? "" : "opacity-50 cursor-not-allowed"
                }`}
                disabled={!isButtonEnabled || isSubmitting}
              />

              {/* redirect to register */}
              <p className="text-center text-sm text-[#D1A054]">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="font-bold hover:underline duration-300"
                >
                  Sign up here
                </Link>
              </p>

              <span className="text-sm text-center block">Or sign up with</span>

              {/* social login */}
              <div className="flex justify-center gap-3">
                <button 
                  type="button"
                  className="p-2 rounded-full border border-black hover:border-[#D1A054] hover:text-white hover:bg-[#D1A054] duration-300"
                >
                  <FaGoogle />
                </button>
                <button 
                  type="button"
                  className="p-2 rounded-full border border-black hover:border-[#D1A054] hover:text-white hover:bg-[#D1A054] duration-300"
                >
                  <FaFacebook />
                </button>
                <button 
                  type="button"
                  className="p-2 rounded-full border border-black hover:border-[#D1A054] hover:text-white hover:bg-[#D1A054] duration-300"
                >
                  <FaGithub />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
