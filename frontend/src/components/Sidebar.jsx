import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  const location = useLocation();
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const user = {
    role: "ADMIN",
  };

  const linksByRole = {
    ADMIN: [
      { name: "Summary", path: "/dashboard/summary" },
      {
        name: "Users",
        children: [
          { name: "Employees", path: "/dashboard/users/employees" },
          { name: "Managers", path: "/dashboard/managers" },
        ],
      },
      {
        name: "Tools",
        children: [{ name: "Notes", path: "/dashboard/notes" }],
      },
    ],
    MANAGER: [
      { name: "Summary", path: "/dashboard/summary" },
      {
        name: "Tasks",
        children: [
          { name: "Assigned", path: "/dashboard/tasks/assigned" },
          { name: "Unassigned", path: "/dashboard/tasks/unassigned" },
          { name: "Closed", path: "/dashboard/tasks/closed" },
        ],
      },
      {
        name: "Tools",
        children: [{ name: "Notes", path: "/dashboard/notes" }],
      },
    ],
    EMPLOYEE: [
      { name: "Summary", path: "/dashboard/summary" },
      {
        name: "Tasks",
        children: [
          { name: "Upcoming", path: "/dashboard/tasks/upcoming" },
          { name: "Due", path: "/dashboard/tasks/due" },
          { name: "Completed", path: "/dashboard/tasks/completed" },
        ],
      },
      {
        name: "Tools",
        children: [{ name: "Notes", path: "/dashboard/notes" }],
      },
    ],
  };

  const links = linksByRole[user?.role] || [];

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/20 z-20 md:hidden transition ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed md:relative h-full shrink-0 bg-white border-r border-gray-200 flex flex-col justify-between z-30
  overflow-hidden transition-all duration-300 ease-in-out
  ${
    isOpen
      ? "w-64 translate-x-0 md:w-64"
      : "w-64 -translate-x-full md:w-0 md:translate-x-0"
  }`}
      >
        <div
          className={`flex flex-col h-full ${
            isOpen ? "opacity-100" : "opacity-0 md:opacity-0"
          }`}
        >
          {/* Top / Logo */}
          <div className="px-6 py-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Remote Work Tracker
            </h2>

            {/* Close Button (Mobile Only) */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden text-gray-500 hover:text-black"
            >
              ✕
            </button>
          </div>

          {/* Search bar  */}
          {(user?.role === "MANAGER" || user?.role === "EMPLOYEE") && (
            <div className="p-4 border-b border-gray-200">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {searchText && (
                <div className="mt-2 bg-white border border-gray-300 rounded shadow-sm max-h-60 overflow-y-auto">
                  {searchResults.length === 0 ? (
                    <div className="p-2 text-gray-500 text-sm">
                      No tasks found
                    </div>
                  ) : (
                    searchResults.map((task) => (
                      <div
                        key={task._id}
                        onClick={() => {
                          navigate(`/dashboard/task/${task._id}`);
                          setSearchText("");
                          setIsOpen(false);
                        }}
                        className="p-2 text-sm hover:bg-gray-100 cursor-pointer"
                      >
                        <div className="font-medium text-gray-800">
                          {task.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {task.assigned_to?.name || "Unassigned"}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-6 py-6 space-y-6 overflow-y-auto">
            {links.map((link) =>
              link.children ? (
                <div key={link.name}>
                  <div className="text-xs uppercase text-gray-400 font-medium mb-3 tracking-wider">
                    {link.name}
                  </div>

                  <div className="flex flex-col gap-1">
                    {link.children.map((child) => {
                      const active = location.pathname === child.path;

                      return (
                        <Link
                          key={child.name}
                          to={child.path}
                          className={`px-3 py-2 text-sm rounded transition ${
                            active
                              ? "bg-gray-100 font-medium"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-2 text-sm rounded transition ${
                    location.pathname === link.path
                      ? "bg-gray-100 font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {link.name}
                </Link>
              ),
            )}
          </nav>

          {/* Footer */}
          <div className="px-6 py-6 border-t border-gray-200 space-y-2">
            <button className="block text-sm text-gray-500 hover:text-black transition">
              Profile
            </button>
            <button className="block text-sm text-gray-500 hover:text-red-500 transition">
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
