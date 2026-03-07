import React from "react";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getEmployeeById } from "./admin.api";

function Employee() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null)
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await getEmployeeById(id)

        setEmployee(data.employee)
        setStats(data.stats)
      } catch (error) {
        console.error("Error fetching employee:", error);
      } finally {
        setLoading(false)
      }
    }

    fetchEmployee()
  }, [id])

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <div>
        {/* HEADER */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Employee Details
            </h1>
            <p className="mt-3 text-gray-600 text-sm">
              View complete employee profile, activity, and management info.
            </p>
          </div>

          <button className="w-full sm:w-auto px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm"
            onClick={() => { document.getElementById("edit")?.scrollIntoView({ behavior: "smooth" }) }}
          >
            Edit Employee
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
                <div className="border border-gray-200 p-6">
                  <p className="text-gray-500">Total</p>
                  <p className="mt-2 text-xl font-medium text-gray-900">{stats?.total}</p>
                </div>

                <div className="border border-gray-200 p-6">
                  <p className="text-gray-500">Completed</p>
                  <p className="mt-2 text-xl font-medium text-gray-900">{stats?.completed}</p>
                </div>

                <div className="border border-gray-200 p-6">
                  <p className="text-gray-500">Pending</p>
                  <p className="mt-2 text-xl font-medium text-gray-900">{stats?.pending}</p>
                </div>
              </div>
            </div>

            {/* MANAGER RELATIONSHIP */}
            <div>
              <h2 className="text-lg font-medium mb-6">Managers Worked With</h2>

              <div className="border border-gray-200 p-6 text-sm">
                <p className="text-gray-500">Total</p>
                <p className="mt-2 text-xl font-medium text-gray-900">{stats?.managersWorkedWith}</p>
              </div>
            </div>
          </div>

          {/* <p className="text-sm text-gray-500 mt-6">
            Note: Upcoming tasks are excluded from these statistics.
          </p> */}
        </section>

        {/* PROFILE */}
        <section className="border border-gray-200 p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xl font-medium text-gray-700 shrink-0">
              E
            </div>

            <div>
              <h2 className="text-2xl font-medium">{employee?.name}</h2>
              <p className="text-gray-500 mt-2">{employee?.email}</p>
            </div>
          </div>
        </section>

        {/* INFORMATION */}
        <section className="border border-gray-200 p-6 sm:p-8 mb-12">
          <h2 className="text-xl font-medium mb-6">Employee Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-gray-500">Full Name</p>
              <p className="mt-1 font-medium">{employee?.name}</p>
            </div>

            <div>
              <p className="text-gray-500">Email</p>
              <p className="mt-1 font-medium">{employee?.email}</p>
            </div>

            <div>
              <p className="text-gray-500">Role</p>
              <p className="mt-1 font-medium">{employee?.role
                ? employee.role.charAt(0).toUpperCase() + employee.role.slice(1).toLowerCase()
                : "-"}</p>
            </div>

            <div>
              <p className="text-gray-500">Joined on</p>
              <p className="mt-1 font-medium">{new Date(employee.createdAt).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</p>
            </div>

          </div>
        </section>

        {/* CHANGE NAME */}
        <section id="edit" className="border border-gray-200 p-6 sm:p-8 mb-12">
          <h2 className="text-lg sm:text-xl font-medium mb-6">
            Change Name
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <label className="text-gray-500">Full Name</label>
              <input
                type="text"
                defaultValue={employee?.name}
                className="mt-2 w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <button className="mt-4 px-5 py-2 text-sm border border-black hover:bg-black hover:text-white transition">
            Save Changes
          </button>
        </section>

        {/* CHANGE EMAIL */}
        <section className="border border-gray-200 p-6 sm:p-8 mb-12">
          <h2 className="text-lg sm:text-xl font-medium mb-6">
            Change Email
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <label className="text-gray-500">Email</label>
              <input
                type="email"
                defaultValue={employee?.email}
                className="mt-2 w-full border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <button className="mt-4 px-5 py-2 text-sm border border-black hover:bg-black hover:text-white transition">
            Save Changes
          </button>
        </section>

        {/* ACTIVITY */}
        {/* <section className="border border-gray-200 p-6 sm:p-8 mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-8">
            <h2 className="text-xl font-medium">Recent Activity</h2>
            <span className="text-sm text-gray-500">Last 7 days</span>
          </div>

          <div className="divide-y divide-gray-200 text-sm">
            {[1, 2, 3].map((activity) => (
              <div
                key={activity}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1"
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
        </section> */}

        {/* REPORTS */}
        {/* <section className="border border-gray-200 p-6 sm:p-8 mb-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-medium">Reports</h2>
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
                    filed on 2 march 2016
                  </span>
                </div>

                <Link className="inline-flex items-center text-sm text-gray-600 hover:text-black transition w-fit">
                  View
                  <span className="ml-2 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </section> */}

        {/* TIMELINE */}
        {/* <section className="border border-gray-200 p-6 sm:p-8 mb-12">
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
        </section> */}

        {/* danger */}
        <section className="mb-12 border border-red-200 bg-red-50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left Content */}
            <div>
              <h2 className="text-lg font-medium text-red-700">Danger Zone</h2>
              <p className="mt-2 text-sm text-red-600 max-w-xl">
                Blacklisting this employee will restrict their access to the
                system and prevent further task assignments. This action can be
                reversed later from the blacklist management panel.
              </p>
            </div>

            {/* Action Button */}
            <button className="w-full sm:w-auto px-6 py-2 border border-red-600 text-red-600 text-sm transition hover:bg-red-600 hover:text-white">
              Blacklist Employee
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Employee;
