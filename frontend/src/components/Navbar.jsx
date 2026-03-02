import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-lg font-semibold tracking-tight">
          Remote Work Tracker
        </Link>

        {/* Right Actions */}
        {user ? (
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
        ) : (
          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/account/login"
              className="text-gray-600 hover:text-black transition"
            >
              Login
            </Link>

            <Link
              to="/account/verify"
              className="px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;
