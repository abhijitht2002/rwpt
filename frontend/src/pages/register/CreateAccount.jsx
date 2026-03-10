import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { registerAPI } from "../../services/auth.service";
import toast from "react-hot-toast";

function CreateAccount() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [formData, setFormdata] = useState({
    name: "",
    email: email,
    password: "",
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await toast.promise(
        registerAPI(formData),
        {
          loading: "creating...",
          success: (res) => {
            if (res.success) {
              navigate("/account/register-success");
            }
            return res.message || "Account created successfully";
          },
          error: (err) =>
            err.response?.data?.message || "Verification failed",
        }
      )
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold text-gray-900 tracking-tight">
          Complete your account
        </h2>
        <p className="text-sm text-gray-500">
          Set your name and password to finish signup
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Name here"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-black px-4 py-3 focus:outline-none focus:border-black transition"
            required
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            className="w-full border border-gray-300 px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
            disabled
          />
          <p className="text-xs text-green-600 font-medium">✓ Email verified</p>
        </div>

        {/* Password */}
        <div className="space-y-2">
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
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-black px-4 py-3 focus:outline-none focus:border-black transition"
            required
          // minLength={8}
          />
          {/* <p className="text-xs text-gray-500">Must be at least 8 characters</p> */}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-2 border border-black bg-black text-white py-3 font-medium transition-all duration-200 hover:bg-white hover:text-black active:scale-[0.99] hover:cursor-pointer"
          disabled={loading}
        >
          Create Account
        </button>
      </form>
    </>
  );
}

export default CreateAccount;
