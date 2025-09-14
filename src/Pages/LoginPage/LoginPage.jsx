import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { login, loading, isInitialized, user, isAuthenticated } = useContext(AuthContext);
  
  // Show loading while checking authentication
  if (loading && !isInitialized) {
    return (
      <div className="min-h-screen bg-cover bg-center flex items-center justify-center" style={{ backgroundImage: `url(${LOGIN_BG})` }}>
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect logged-in users to their dashboard immediately
  if (isAuthenticated && user) {
    return <Navigate to={`/dashboard/${user.role}`} replace />;
  }
  
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  // Redirect effect when user logs in successfully
  useEffect(() => {
    if (user && isAuthenticated) {
      // Show success message and redirect immediately
      Swal.fire({
        position: "center-center",
        icon: "success",
        title: "Login Successful!",
        text: "Welcome back to Bistro Boss!",
        showConfirmButton: false,
        timer: 1500,
      });
      
      // Redirect to appropriate dashboard based on user role
      const userRole = user.role || "customer";
      navigate(`/dashboard/${userRole}`);
    }
  }, [user, isAuthenticated, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    
    if (captchaInput !== captcha) {
      Swal.fire({
        icon: "error",
        title: "Captcha Error",
        text: "Captcha is incorrect. Please try again.",
      });
      refreshCaptcha();
      return;
    }

    try {
      setIsSubmitting(true);
      const credentials = {
        email: emailValue,
        password: passwordValue,
      };

      const result = await login(credentials);
      // Redirect immediately after successful login
      if (result?.data?.user?.role) {
        navigate(`/dashboard/${result.data.user.role}`);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error?.response?.data?.message || "Invalid email or password. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const refreshCaptcha = () => {
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
    setIsCaptchaValid(false);
  };

  useEffect(() => {
    // Basic validation
    const isEmailValid = emailValue && emailValue.includes('@') && emailValue.includes('.');
    const isPasswordValid = passwordValue && passwordValue.length >= 6;
    const isCaptchaValid = captchaInput.trim() !== "" && captchaInput === captcha;
    
    const isFormValid = isEmailValid && isPasswordValid && isCaptchaValid;



    setIsButtonEnabled(isFormValid);
    setIsCaptchaValid(captchaInput === captcha);
  }, [emailValue, passwordValue, captchaInput, captcha]);

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
            <form onSubmit={onSubmit} className="space-y-3">
              <h2 className="text-2xl font-bold pb-5 text-center">Login</h2>

              {/* email input */}
              <div className="space-y-1">
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Type Email"
                  className="px-4 py-3 w-full rounded border border-gray-300"
                  value={emailValue}
                  onChange={(e) => setEmailValue(e.target.value)}
                />

              </div>

              {/* password input */}
              <div className="space-y-1 relative">
                <label className="text-sm">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your Password"
                  className="px-4 py-3 w-full rounded border border-gray-300"
                  value={passwordValue}
                  onChange={(e) => setPasswordValue(e.target.value)}
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
                    isCaptchaValid && captchaInput !== ""
                      ? "border-green-500 focus:border-green-500"
                      : captchaInput !== "" && !isCaptchaValid
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-300"
                  } mt-2`}
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                />
                {captchaInput !== "" && (
                  <p className={`text-xs ${
                    isCaptchaValid ? "text-green-500" : "text-red-500"
                  }`}>
                    {isCaptchaValid ? "✓ Captcha is correct" : "✗ Invalid captcha"}
                  </p>
                )}
              </div>

              {/* submit button */}
              <input
                type="submit"
                value={isSubmitting ? "Logging In..." : "Login"}
                className={`text-center w-full py-3 text-white rounded transition duration-300 ${
                  isButtonEnabled && !isSubmitting 
                    ? "bg-[#EB0029] hover:bg-red-800 cursor-pointer" 
                    : "bg-gray-400 cursor-not-allowed opacity-50"
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
