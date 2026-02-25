import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Verification() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (secs) => {
    const min = Math.floor(secs / 60);
    const sec = secs % 60;
    return `${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  const handleGenerate = async () => {
    setIsRunning(true);
    setTimeLeft(600);
  };

  const handleVerify = async () => {
    navigate("/account/register");
  };

  return (
    <>
      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h2>
        <p className="text-sm text-gray-600">
          Set up your profile to access the platform.
        </p>
      </div>

      {/* Google OAuth */}
      <div className="mt-6">
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 border py-3 text-sm font-medium transition hover:bg-black hover:text-white hover:cursor-pointer"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t" />
        <span className="px-4 text-xs text-gray-500 uppercase">or</span>
        <div className="flex-1 border-t" />
      </div>

      {/* Form Section */}
      <div className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>

          <div className="relative">
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="w-full border px-4 py-3 pr-32 focus:outline-none focus:border-black transition"
            />

            {/* Send OTP Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isRunning}
              className={`absolute right-2 top-1/2 -translate-y-1/2 text-sm font-medium px-4 py-2 transition
            ${
              isRunning
                ? "text-gray-500 cursor-not-allowed"
                : "border border-black text-black hover:bg-black hover:text-white hover:cursor-pointer"
            }`}
            >
              {isRunning ? formatTime(timeLeft) : "Send OTP"}
            </button>
          </div>

          {isRunning && (
            <p className="text-xs text-gray-500">
              Code expires in {formatTime(timeLeft)}
            </p>
          )}
        </div>

        {/* OTP Section */}
        {isRunning && (
          <div className="space-y-2">
            <label htmlFor="otp" className="text-sm font-medium text-gray-700">
              OTP
            </label>

            <input
              id="otp"
              type="text"
              name="otp"
              maxLength={6}
              placeholder="Enter 6-digit code"
              className="w-full border px-4 py-3 tracking-widest focus:outline-none focus:border-black transition"
            />

            <button
              type="submit"
              onClick={handleVerify}
              className="w-full mt-2 border border-black bg-black text-white py-3 transition hover:bg-white hover:text-black hover:cursor-pointer"
            >
              Verify →
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-600 text-center">
        Already have an account?{" "}
        <Link to="/account/login" className="relative font-medium text-black group">
          Login
          <span className="absolute left-0 -bottom-1 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
        </Link>
      </p>
    </>
  );
}

export default Verification;
