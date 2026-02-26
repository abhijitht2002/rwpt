import React from "react";
import { Link } from "react-router-dom";

function Managers() {
  const managers = [
    { id: 0, name: "test1", email: "test1@email.com" },
    { id: 1, name: "test2", email: "test2@email.com" },
    { id: 2, name: "test3", email: "test3@email.com" },
    { id: 3, name: "test4", email: "test4@email.com" },
    { id: 4, name: "test5", email: "test5@email.com" },
    { id: 5, name: "test6", email: "test6@email.com" },
    { id: 6, name: "test7", email: "test7@email.com" },
    { id: 7, name: "test8", email: "test8@email.com" },
    { id: 8, name: "test9", email: "test9@email.com" },
    { id: 9, name: "test10", email: "test10@email.com" },
  ];

  const handleAddManager = () => {};

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
                required
                className="mt-2 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter manager name"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-2 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-black"
                placeholder="Enter manager email"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm"
              >
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
              {managers.length} total
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
                  key={manager.id}
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
                        <div className="text-sm text-gray-500 mt-1">
                          {manager.email}
                        </div>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="sm:text-right">
                      <Link
                        // to={}
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
              Showing 1–10 of 48 managers
            </div>

            {/* Right - Controls */}
            <div className="w-full sm:w-auto">
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-sm">
                {/* Previous */}
                <button className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex flex-wrap items-center gap-1">
                  <button className="px-3 py-1 border border-black bg-black text-white">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 hover:bg-gray-100 transition">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 hover:bg-gray-100 transition">
                    3
                  </button>
                </div>

                {/* Next */}
                <button className="px-3 py-1 border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
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
