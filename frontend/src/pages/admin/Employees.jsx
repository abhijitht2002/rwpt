import React from "react";
import { Link } from "react-router-dom";

function Employees() {
  const employees = [
    { id: 0, name: "test1", email: "test1@email.com", blacklisted: false },
    { id: 1, name: "test2", email: "test2@email.com", blacklisted: true },
    { id: 2, name: "test3", email: "test3@email.com", blacklisted: false },
    { id: 3, name: "test4", email: "test4@email.com", blacklisted: true },
    { id: 4, name: "test5", email: "test5@email.com", blacklisted: false },
    { id: 5, name: "test6", email: "test6@email.com", blacklisted: false },
    { id: 6, name: "test7", email: "test7@email.com", blacklisted: true },
    { id: 7, name: "test8", email: "test8@email.com", blacklisted: false },
    { id: 8, name: "test9", email: "test9@email.com", blacklisted: true },
    { id: 9, name: "test10", email: "test10@email.com", blacklisted: false },
  ];

  return (
    <div>
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium">Employees</h2>
          <span className="text-sm text-gray-500">
            {employees.length} total
          </span>
        </div>

        <div className="w-full mb-8">
          <input
            type="text"
            //   value={value}
            //   onChange={onChange}
            placeholder="Search employees..."
            className="w-full px-4 py-2 border border-gray-300 text-sm rounded 
                   focus:outline-none focus:ring-1 focus:ring-black 
                   placeholder:text-gray-400 transition"
          />
        </div>

        <div className="">
          {employees.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No managers added yet.
            </div>
          ) : (
            employees.map((employee) => (
              <div key={employee.id} className="group border-b border-gray-200">
                <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 transition">
                  {/* Left Side */}
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 shrink-0">
                      {employee.name?.charAt(0)?.toUpperCase() || "M"}
                    </div>

                    {/* Text Info */}
                    <div>
                      <div className="font-medium text-gray-900">
                        {employee.name}
                      </div>

                      {employee.blacklisted && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 border border-red-200 rounded">
                          Blacklisted
                        </span>
                      )}

                      <div className="text-sm text-gray-500 mt-1">
                        {employee.email}
                      </div>
                    </div>
                  </div>

                  {/* Right Side */}
                  <div className="sm:text-right">
                    <Link
                      to="/dashboard/employee"
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
            Showing 1–10 of 48 employees
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
  );
}

export default Employees;
