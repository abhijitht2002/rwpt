import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useEffect, useState } from "react";

function TasksPage() {
    const { filter } = useParams();
    const { user } = useAuth()
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    useEffect(() => {

        const datas = [{
            id: 0,
            title: "Title comes here",
            description: "Description comes here",

        }, {
            id: 1,
            title: "Title comes here",
            description: "Description comes here",

        }, {
            id: 2,
            title: "Title comes here",
            description: "Description comes here",

        }, {
            id: 3,
            title: "Title comes here",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque ipsa magni tempora facere aut suscipit quasi neque sapiente consequuntur explicabo.",

        }, {
            id: 4,
            title: "Title comes here",
            description: "Description comes here",

        }]

        setTasks(datas)

    }, [])

    const isManager = user?.role === "MANAGER";

    // filter = assigned | unassigned | closed | upcoming | due | completed

    return (
        <div>
            {isManager && filter !== "closed" && (<section className="border border-gray-200 p-8">
                <h2 className="text-xl font-medium">Create a task</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Provide the manager's name and email to grant access to the system.
                </p>

                <form
                    // onSubmit={handleAddManager}
                    className="mt-8 grid md:grid-cols-2 gap-6"
                >
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            // value={form.name}
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
                            // value={form.email}
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
                            // disabled={creating}
                            className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm"
                        >
                            {/* {creating ? "creating..." : "Add Manager"} */}
                            Create Task
                        </button>
                    </div>
                </form>
                {/* horizontal divider */}

            </section>)}

            {/* taskslist */}
            <section className="mt-12">
                {/* Header */}
                <div>
                    <div className="flex items-center gap-4">
                        <h2 className="text-lg font-semibold text-gray-800 whitespace-nowrap">
                            Tasks
                        </h2>

                        {/* Expanding line */}
                        <div className="flex-1 h-px bg-gray-200"></div>
                    </div>
                </div>


                {/* Task List */}
                <div className="mt-6">

                    {tasks.length === 0 && (
                        <div className="py-8 text-sm text-gray-500">
                            No tasks found.
                        </div>
                    )}

                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            onClick={() => navigate(`/dashboard/task/${task._id}`)}
                            className="flex flex-col sm:flex-row sm:items-center sm:justify-between
  px-4 sm:px-6 py-4
  bg-gray-100/80
  border-b border-gray-200
  transition-all duration-200 ease-out
  hover:shadow-sm
  hover:-translate-y-[1px]
  cursor-pointer"
                        >
                            {/* Left Side */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 min-w-0">

                                {/* Title */}
                                <div className="font-medium text-gray-800 truncate sm:w-48">
                                    {task.title}
                                </div>

                                {/* Description */}
                                <div className="text-sm text-gray-500 truncate">
                                    {task.description}
                                </div>
                            </div>

                            {/* Right Side - Date */}
                            <div className="text-xs text-gray-400 whitespace-nowrap">
                                {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
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
    );
}

export default TasksPage
