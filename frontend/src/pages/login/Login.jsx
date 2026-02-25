import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      {/* Heading */}
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">
          Login to your account
        </h2>
        <p className="text-sm text-gray-600">
          Enter your credentials to access the platform.
        </p>
      </div>

      {/* Google Login */}
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
      <form onSubmit={() => {}} className="space-y-5">
        {/* Email Field */}
        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="w-full border px-4 py-3 focus:outline-none focus:border-black transition"
            required
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter your password"
            className="w-full border px-4 py-3 focus:outline-none focus:border-black transition"
            required
          />
          <Link
            to="/forgot-password"
            className="text-sm text-blue-600 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          className="w-full mt-2 border border-black bg-black text-white py-3 transition hover:bg-white hover:text-black hover:cursor-pointer"
        >
          Login →
        </button>
      </form>

      {/* Footer Links */}
      <div className="mt-6 flex flex-col items-center gap-2 text-sm">
        {/* Create Account */}
        <p className="text-gray-600">
          New here?{" "}
          <Link
            to="/account/verify"
            className="relative font-medium text-black group"
          >
            Create an account
            <span className="absolute left-0 -bottom-1 h-px w-0 bg-black transition-all duration-300 group-hover:w-full" />
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
