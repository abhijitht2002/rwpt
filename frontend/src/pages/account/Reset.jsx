import React from 'react'
import { useState } from 'react';
import { changePasswordAPI } from '../../services/profile.service';
import toast from "react-hot-toast";

function Reset() {
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [show, setShow] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true)

      await toast.promise(
        changePasswordAPI(form.oldPassword, form.newPassword),
        {
          loading: "Updating password...",
          success: (res) => res.message || "Password updated successfully",
          error: (err) => err.response?.data?.message || "Operation failed",
        }
      )

      setForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="border border-gray-200 p-5 sm:p-8 mb-12">
        <h2 className="text-lg sm:text-xl font-medium">Reset Password</h2>

        <p className="mt-2 text-sm text-gray-600">
          Enter your current password and choose a new password to update your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-6 max-w-md w-full">

          {/* Old Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Old Password
            </label>

            <div className="relative mt-2">
              <input
                type={show.old ? "text" : "password"}
                placeholder="Enter old password"
                value={form.oldPassword}
                onChange={(e) =>
                  setForm({ ...form, oldPassword: e.target.value })
                }
                className="w-full px-3 py-2 pr-12 border border-gray-300 rounded text-sm"
              />

              <button
                type="button"
                onClick={() => setShow({ ...show, old: !show.old })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 px-1"
              >
                {show.old ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              New Password
            </label>

            <div className="relative mt-2">
              <input
                type={show.new ? "text" : "password"}
                placeholder="Enter new password"
                value={form.newPassword}
                onChange={(e) =>
                  setForm({ ...form, newPassword: e.target.value })
                }
                className="w-full px-3 py-2 pr-12 border border-gray-300 rounded text-sm"
              />

              <button
                type="button"
                onClick={() => setShow({ ...show, new: !show.new })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 px-1"
              >
                {show.new ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Confirm New Password
            </label>

            <div className="relative mt-2">
              <input
                type={show.confirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
                className="w-full px-3 py-2 pr-12 border border-gray-300 rounded text-sm"
              />

              <button
                type="button"
                onClick={() =>
                  setShow({ ...show, confirm: !show.confirm })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700 px-1"
              >
                {show.confirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm"
              disabled={loading}
            >
              Reset
            </button>
          </div>

        </form>
      </section>
    </>
  )
}

export default Reset