import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetForgotPasswordAPI } from '../../services/auth.service';
import toast from "react-hot-toast";

function Forgot() {
    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [show, setShow] = useState({
        new: false,
        confirm: false,
    });
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();
    const email = location.state?.email;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            await toast.promise(
                resetForgotPasswordAPI(email, form.newPassword),
                {
                    loading: "creating...",
                    success: (res) => {
                        if (res.success) {
                            navigate("/account/login")
                        }
                        return res.message || "Password changed";
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
    }

    return (
        <>
            {/* Heading */}
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Create New Password
                </h2>
                <p className="text-sm text-gray-600">
                    Set a new password for your account.
                </p>
            </div>



            {/* Form Section */}
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                        New Password
                    </label>

                    <div className="relative mt-2">
                        <input
                            type={show.new ? "text" : "password"}
                            name="newPassword"
                            placeholder="Enter your new password"
                            className="w-full border px-4 py-3 pr-14 focus:outline-none focus:border-black transition"
                            value={form.newPassword}
                            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShow({ ...show, new: !show.new })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-700"
                        >
                            {show.new ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-gray-700"
                    >
                        Confirm Password
                    </label>
                    <input
                        type={show.confirm ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Enter your password again"
                        className="w-full border px-4 py-3 focus:outline-none focus:border-black transition"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 border border-black bg-black text-white py-3 transition hover:bg-white hover:text-black hover:cursor-pointer"
                >
                    {loading ? "Saving..." : "Change →"}
                </button>
            </form>
        </>
    )
}

export default Forgot