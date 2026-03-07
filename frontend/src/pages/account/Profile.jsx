import React, { useEffect, useState } from "react";
import { getProfileAPI } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Profile() {
  const { logout } = useAuth()
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)

        const data = await getProfileAPI()
        console.log(data)

        setUser(data.user)
      } catch (error) {
        console.error("Failed to fetch profile:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log("Avatar file:", file);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault()

    navigate("/dashboard/account/reset-password")
  }

  const handleDelete = async (e) => {
    e.preventDefault()

    // logout()
    navigate("/account/login")
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div>
        {/* HEADER */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
            <p className="mt-3 text-gray-600 text-sm">
              Manage your account settings and personal information.
            </p>
          </div>
        </div>

        {loading ? (<div className="text-sm text-gray-500">Loading profile...</div>) : (<>
          <section className="border border-gray-200 p-6 sm:p-8 mb-12">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-medium text-gray-700">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>

                <label className="absolute -bottom-2 -right-2 bg-white border border-gray-300 text-xs px-2 py-1 cursor-pointer hover:bg-gray-100 transition">
                  Edit
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>

              <div>
                <h2 className="text-2xl font-medium">{user?.name
                  ? user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
                  : "-"}</h2>
                <p className="text-gray-500 mt-2">{user?.email}</p>
              </div>
            </div>
          </section>

          {/* ACCOUNT INFORMATION */}
          <section className="border border-gray-200 p-6 sm:p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Account Information</h2>

              {/* <button className="px-5 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm">
              Edit Profile
            </button> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="mt-1 font-medium">{user?.name
                  ? user.name.charAt(0).toUpperCase() + user.name.slice(1).toLowerCase()
                  : "-"}</p>
              </div>

              <div>
                <p className="text-gray-500">Email</p>
                <p className="mt-1 font-medium">{user?.email}</p>
              </div>

              <div>
                <p className="text-gray-500">Role</p>
                <p className="mt-1 font-medium">{user?.role
                  ? user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()
                  : "-"}</p>
              </div>

              <div>
                <p className="text-gray-500">Joined on</p>
                <p className="mt-1 font-medium">{new Date(user?.createdAt).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</p>
              </div>
            </div>
          </section>

          {/* SECURITY */}
          <section className="border border-gray-200 p-6 sm:p-8 mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium">Security</h2>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-sm">
              <div>
                <p className="text-gray-500">Password</p>
                <p className="mt-1 font-medium">************</p>
              </div>

              <button className="px-5 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                onClick={handleResetPassword}
              >
                Reset Password
              </button>
            </div>
          </section>

          {/* DANGER ZONE */}
          {user?.role === "EMPLOYEE" && (
            <section className="mb-12 border border-red-200 bg-red-50 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-medium text-red-700">
                    Danger Zone
                  </h2>

                  <p className="mt-2 text-sm text-red-600 max-w-xl">
                    Deleting your account will permanently remove your profile
                    and all related data from the system. This action cannot be
                    undone.
                  </p>
                </div>

                <button className="w-full sm:w-auto px-6 py-2 border border-red-600 text-red-600 text-sm transition hover:bg-red-600 hover:text-white"
                  onClick={handleDelete}
                >
                  Delete Account
                </button>
              </div>
            </section>
          )}
        </>)}


      </div>
    </div>
  );
}

export default Profile;