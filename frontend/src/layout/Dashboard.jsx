import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b border-gray-200 px-8 py-5 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded transition"
              aria-label="Toggle Sidebar"
            >
              ☰
            </button>

            <div>
              <h1 className="text-xl font-semibold tracking-tight">
                Dashboard
              </h1>
              {/* <p className="text-sm text-gray-500">
                Structured overview of tasks and activity
              </p> */}
            </div>
          </div>

          {/* Right Section (Avatar) */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">Admin</p>
              {/* <p className="text-xs text-gray-500">Workspace</p> */}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium">
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-10 py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
