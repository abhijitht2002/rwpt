import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createManager, listManagers } from "./admin.api";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Managers() {
  const [managers, setManagers] = useState([])
  const [form, setForm] = useState({
    name: "",
    email: "",
  })
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const [creating, setCreating] = useState(false);

  const fetchManagers = async () => {
    try {
      const data = await listManagers(page, 5);
      console.log(data);
      console.log("pagination: ", data.pagination);

      setManagers(data.data);
      setTotal(data.pagination.total)
      setTotalPages(data.pagination.totalPages)
    } catch (err) {
      console.error("Error fetching employees:", err);
      setManagers([]);
    }
  };

  useEffect(() => {
    fetchManagers()
  }, [page])

  const handleAddManager = async (e) => {
    e.preventDefault();

    setCreating(true)

    try {
      await toast.promise(
        createManager(form),
        {
          loading: "Creating manager...",
          success: (res) => {
            fetchManagers();
            setForm({ name: "", email: "" });
            return res.message || "Manager created successfully";
          },
          error: (err) =>
            err.response?.data?.message || "Failed to create manager",
        }
      )
    } finally {
      setCreating(false);
    }

  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div className="">
        {/* PAGE HEADER */}
        <div className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight">
            Manage Managers
          </h1>
          <p className="mt-3 text-gray-600 text-sm">
            Add and manage managers responsible for overseeing team tasks and
            productivity.
          </p>
        </div>

        {/* ADD MANAGER SECTION */}
        <section className="border border-gray-200 p-8">
          <h2 className="text-xl font-medium">Add Manager</h2>
          <p className="mt-2 text-sm text-gray-600">
            Provide the manager's name and email to grant access to the system.
          </p>

          <form
            onSubmit={handleAddManager}
            className="mt-8 grid md:grid-cols-2 gap-6"
          >
            {/* Name */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Enter manager name"
                className="mt-2 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Enter manager email"
                className="mt-2 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={creating}
                className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm"
              >
                {/* {creating ? "creating..." : "Add Manager"} */}
                Add Manager
              </button>
            </div>
          </form>
        </section>

        {/* DIVIDER */}
        <div className="border-t border-gray-200 my-14" />

        {/* MANAGERS LIST */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium">Managers</h2>
            <span className="text-sm text-gray-500">
              {total} total
            </span>
          </div>

          <div className="w-full mb-8">
            <input
              type="text"
              //   value={value}
              //   onChange={onChange}
              placeholder="Search managers..."
              className="w-full px-4 py-2 border border-gray-300 text-sm rounded 
                   focus:outline-none focus:ring-1 focus:ring-black 
                   placeholder:text-gray-400 transition"
            />
          </div>

          <div className="">
            {managers.length === 0 ? (
              <div className="p-6 text-sm text-gray-500">
                No managers added yet.
              </div>
            ) : (
              managers.map((manager) => (
                <div
                  key={manager._id}
                  className="group border-b border-gray-200"
                >
                  <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 transition">
                    {/* Left Side */}
                    <div className="flex items-start sm:items-center gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 shrink-0">
                        {manager.name?.charAt(0)?.toUpperCase() || "M"}
                      </div>

                      {/* Text Info */}
                      <div>
                        <div className="font-medium text-gray-900">
                          {manager.name}
                        </div>

                        {manager.status === "BLOCKED" && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 border border-red-200 rounded">
                            Blocked
                          </span>
                        )}

                        <div className="text-sm text-gray-500 mt-1">
                          {manager.email}
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="sm:text-right">
                      <Link
                        to="/dashboard/manager"
                        className="inline-flex items-center text-sm text-gray-600 hover:text-black transition"
                      >
                        View
                        <span className="ml-2 transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left - Showing info */}
            <div className="text-sm text-gray-500 text-center sm:text-left">
              Showing {(page - 1) * 5 + 1}–
              {Math.min(page * 5, total)} of {total} managers
            </div>

            {/* Right - Controls */}
            <div className="w-full sm:w-auto">
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-sm">
                {/* Previous */}
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  className={`px-3 py-1 border transition ${page === 1
                    ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex flex-wrap items-center gap-1">
                  {
                    pages.map((p) =>
                    (
                      <button key={p}
                        onClick={() => setPage(p)}
                        className={`px-3 py-1 border transition ${page === p
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:bg-gray-100"
                          }`}
                      >
                        {p}
                      </button>
                    )
                    )
                  }

                </div>

                {/* Next */}
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  className={`px-3 py-1 border transition ${page === totalPages
                    ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                    : "border-gray-300 text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Managers;
