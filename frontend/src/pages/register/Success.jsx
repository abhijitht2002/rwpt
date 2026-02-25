import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/account/login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md text-center space-y-6">
        {/* Rounded Tick Logo */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-black flex items-center justify-center">
            <svg
              className="w-10 h-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Successfully Registered
          </h2>
          <p className="text-sm text-gray-600">
            Your account has been created successfully. You will be redirected
            to the login page shortly.
          </p>
        </div>

        {/* Login Button (Primary Action) */}
        <Link
          to="/account/login"
          className="inline-block w-full border border-black bg-black text-white py-3 text-sm font-medium transition hover:bg-white hover:text-black"
        >
          Go to Login →
        </Link>

        {/* Auto Redirect Hint */}
        <p className="text-xs text-gray-400">
          Redirecting automatically in a few seconds...
        </p>
      </div>
    </div>
  );
}

export default Success;
