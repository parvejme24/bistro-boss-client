import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import LOGIN_IMAGE from "../../assets/login.png";
import { Link } from "react-router-dom";
import LOGIN_BG from "../../assets/login-bg.png";
import { EmailInput } from "./LoginComponents/EmailInput";
import { PasswordInput } from "./LoginComponents/PasswordInput";
import { Captcha } from "./LoginComponents/Captcha";
import { SubmitButton } from "./LoginComponents/SubmitButton";
import { SocialLogin } from "./LoginComponents/SocialLogin";

// function to generate a random captcha
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
  const [showPassword, setShowPassword] = useState(false);
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (captchaInput !== captcha) {
      alert("Captcha is incorrect. Please try again.");
    } else {
      console.log("Form Data:", data);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white bg-opacity-60 p-10 rounded-lg shadow-md mx-5 lg:mx-0">
          <div className="hidden md:flex justify-center items-center">
            <img src={LOGIN_IMAGE} alt="Login" className="w-full" />
          </div>

          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <h2 className="text-2xl font-bold pb-5 text-center">Login</h2>
              <EmailInput register={register} errors={errors} />
              <PasswordInput
                register={register}
                errors={errors}
                showPassword={showPassword}
                togglePasswordVisibility={togglePasswordVisibility}
              />
              <Captcha
                captcha={captcha}
                setCaptchaInput={setCaptchaInput}
                isCaptchaValid={isCaptchaValid}
                refreshCaptcha={refreshCaptcha}
                captchaInput={captchaInput}
              />
              <SubmitButton isButtonEnabled={isButtonEnabled} />
            </form>

            <p className="my-5 text-center text-sm text-[#D1A054]">
              New to this website?{" "}
              <Link
                to={"/login"}
                className="font-bold hover:underline duration-300"
              >
                Go to sign up page
              </Link>
            </p>

            <SocialLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
