import React from "react";
import { Link } from "react-router-dom";

function Manager() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* HEADER */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Manager Details
          </h1>
          <p className="mt-2 text-gray-600 text-sm">
            View and manage all information related to this manager.
          </p>
        </div>

        <button className="w-full sm:w-auto px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm">
          Edit Manager
        </button>
      </div>

      {/* INFO CLUSTER */}
      <section className="mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* TASK STATS */}
          <div>
            <h2 className="text-base sm:text-lg font-medium mb-6">
              Task Overview
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="border border-gray-200 p-5 sm:p-6">
                <p className="text-gray-500">Total</p>
                <p className="mt-2 text-xl font-medium text-gray-900">24</p>
              </div>

              <div className="border border-gray-200 p-5 sm:p-6">
                <p className="text-gray-500">Completed</p>
                <p className="mt-2 text-xl font-medium text-gray-900">18</p>
              </div>

              <div className="border border-gray-200 p-5 sm:p-6">
                <p className="text-gray-500">Developing</p>
                <p className="mt-2 text-xl font-medium text-gray-900">6</p>
              </div>
            </div>
          </div>

          {/* EMPLOYEE RELATIONSHIP */}
          <div>
            <h2 className="text-base sm:text-lg font-medium mb-6">
              Employees
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
              <div className="border border-gray-200 p-5 sm:p-6">
                <p className="text-gray-500">Total</p>
                <p className="mt-2 text-xl font-medium text-gray-900">3</p>
              </div>

              <div className="border border-gray-200 p-5 sm:p-6">
                <p className="text-gray-500">Working</p>
                <p className="mt-2 text-xl font-medium text-gray-900">2</p>
              </div>

              <div className="border border-gray-200 p-5 sm:p-6">
                <p className="text-gray-500">Not working</p>
                <p className="mt-2 text-xl font-medium text-gray-900">1</p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Note: Upcoming tasks are excluded from these statistics.
        </p>
      </section>

      {/* PROFILE SECTION */}
      <section className="border border-gray-200 p-6 sm:p-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-medium text-gray-700 shrink-0">
            M
          </div>

          {/* Basic Info */}
          <div>
            <h2 className="text-xl sm:text-2xl font-medium">Manager Name</h2>
            <p className="text-gray-500 mt-2 text-sm">manager@email.com</p>

            <div className="mt-4 text-sm text-gray-600">
              Role: Manager <br />
              Joined: Jan 12, 2025 <br />
              Status: Active
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS GRID */}
      <section className="border border-gray-200 p-6 sm:p-8 mb-12">
        <h2 className="text-lg sm:text-xl font-medium mb-6">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="mt-1 font-medium">Manager Name</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="mt-1 font-medium">manager@email.com</p>
          </div>

          <div>
            <p className="text-gray-500">Phone</p>
            <p className="mt-1 font-medium">+91 XXXXX XXXXX</p>
          </div>

          <div>
            <p className="text-gray-500">Department</p>
            <p className="mt-1 font-medium">Coming soon</p>
          </div>
        </div>
      </section>

      {/* TEAM MEMBERS */}
      <section className="border border-gray-200 p-6 sm:p-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
          <h2 className="text-lg sm:text-xl font-medium">
            Assigned Employees
          </h2>
          <span className="text-sm text-gray-500">12 employees</span>
        </div>

        <div className="divide-y divide-gray-200">
          {[1, 2, 3].map((emp) => (
            <div
              key={emp}
              className="py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-start gap-4 min-w-0 sm:items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 shrink-0">
                  E
                </div>

                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">
                    Employee Name
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    employee@email.com
                  </p>
                </div>
              </div>

              {/* Right: Action */}
              <button className="text-sm text-gray-600 hover:text-black transition w-fit">
                View →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVITY */}
      <section className="border border-gray-200 p-6 sm:p-8 mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
          <h2 className="text-lg sm:text-xl font-medium">Recent Activity</h2>
          <span className="text-sm text-gray-500">Last 7 days</span>
        </div>

        <div className="divide-y divide-gray-200 text-sm">
          {[1, 2, 3].map((activity) => (
            <div
              key={activity}
              className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
            >
              <p className="text-gray-700">
                Completed assigned task: Task Title
              </p>
              <span className="text-gray-400 text-xs sm:text-sm">
                2 hours ago
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* REPORTS */}
      <section className="border border-gray-200 p-6 sm:p-8 mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg sm:text-xl font-medium">Reports</h2>
        </div>

        <div className="divide-y divide-gray-200 text-sm">
          {[1, 2, 3].map((activity) => (
            <div
              key={activity}
              className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div>
                <p className="text-gray-700">
                  Violation of the rights of employees
                </p>
                <span className="text-gray-400 text-xs sm:text-sm">
                  filed on 2 March 2016
                </span>
              </div>

              <Link className="inline-flex items-center text-sm text-gray-600 hover:text-black transition w-fit">
                View →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border border-gray-200 p-6 sm:p-8 mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg sm:text-xl font-medium">Timeline</h2>
        </div>

        <div className="flex flex-col">
          {[1, 2, 3].map((activity, index, arr) => (
            <div key={activity} className="flex flex-col">
              <div className="pb-6">
                <h3 className="text-sm sm:text-base font-medium text-gray-900">
                  Changed Email
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-400">
                  1 March 2016
                </p>
              </div>

              {index !== arr.length - 1 && (
                <div className="h-6 border-l border-gray-200 ml-1" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* danger */}
      <section className="mb-12 border border-red-200 bg-red-50 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left Content */}
          <div>
            <h2 className="text-lg font-medium text-red-700">Danger Zone</h2>
            <p className="mt-2 text-sm text-red-600 max-w-xl">
              Blacklisting this Manager will restrict their access to the
              system and prevent further task assignments. This action can be
              reversed later from the blacklist management panel.
            </p>
          </div>

          {/* Action Button */}
          <button className="w-full sm:w-auto px-6 py-2 border border-red-600 text-red-600 text-sm transition hover:bg-red-600 hover:text-white">
            Block Manager
          </button>
        </div>
      </section>
    </div>
  );
}

export default Manager;
