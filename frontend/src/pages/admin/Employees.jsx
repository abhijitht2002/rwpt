import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listEmployees, searchEmployeesAPI } from "./admin.api";

function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([])
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const fetchEmployees = async () => {
    try {
      const data = await listEmployees(page, 5);
      console.log(data);

      setEmployees(data.data);
      setTotal(data.pagination.total)
      setTotalPages(data.pagination.totalPages)
    } catch (err) {
      console.error("Error fetching employees:", err);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees()
  }, [page])

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const result = await searchEmployeesAPI(searchText)
        setSearchResults(result.employees || [])
      } catch (error) {
        console.log(error);
      }
    }

    if (searchText.trim()) {
      fetchSearch()
    } else {
      setSearchResults([]);
    }
  }, [searchText])

  return (
    <div>
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-medium">Employees</h2>
          <span className="text-sm text-gray-500">
            {total} total
          </span>
        </div>

        {/* Search bar  */}
        <div className="w-full mb-8 relative">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search employees..."
            className="w-full px-4 py-2 border border-gray-300 text-sm rounded 
                   focus:outline-none focus:ring-1 focus:ring-black 
                   placeholder:text-gray-400 transition"
          />
          {searchText && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-gray-300 rounded shadow-sm overflow-y-auto z-50">
              {searchResults.length === 0 ? (
                <div className="p-2 text-gray-500 text-sm">
                  No employees found
                </div>
              ) : (
                searchResults.map((i) => (
                  <div
                    key={i._id}
                    onClick={() => {
                      navigate(`/dashboard/employees/${i._id}`);
                      setSearchText("");
                      setSearchResults([]);
                    }}
                    className="p-2 text-sm hover:bg-gray-100 cursor-pointer transition"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium text-gray-800 truncate">
                        {i.name}
                      </span>
                      <span className="text-xs text-gray-500 truncate">
                        {i.email}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <div className="">
          {employees.length === 0 ? (
            <div className="p-6 text-sm text-gray-500">
              No managers added yet.
            </div>
          ) : (
            employees.map((employee) => (
              <div key={employee._id} className="group border-b border-gray-200">
                <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-gray-50 transition">
                  {/* Left Side */}
                  <div className="flex items-start sm:items-center gap-4">
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-sm font-medium text-gray-700 overflow-hidden">
                      {employee?.avatar ? (
                        <img
                          src={employee.avatar}
                          alt={employee?.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span>{employee?.name?.charAt(0)?.toUpperCase()}</span>
                      )}
                    </div>

                    {/* Text Info */}
                    <div>
                      <div className="font-medium text-gray-900">
                        {employee.name}
                      </div>

                      {employee.status === "BLOCKED" && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 border border-red-200 rounded">
                          Blocked
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
                      to={`/dashboard/employees/${employee._id}`}
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
            {Math.min(page * 5, total)} of {total} employees
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
  );
}

export default Employees;
