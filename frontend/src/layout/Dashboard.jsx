import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (loading) {
    return (
      <div className="flex h-screen bg-white">
        {/* Sidebar Skeleton */}
        <div className="w-64 border-r border-gray-200 p-6 space-y-4">
          <div className="h-6 bg-gray-200 rounded w-40 animate-pulse" />
          <div className="space-y-3 mt-6">
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse" />
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1 p-10 space-y-6">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-40 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    );
  }

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
              <p className="text-sm font-medium">{user?.name}</p>
              {/* <p className="text-xs text-gray-500">Workspace</p> */}
            </div>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
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
