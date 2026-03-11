import { useEffect, useState } from "react";
import { createTaskAPI, getEmployeesAPI } from "../services/manager.service";
import toast from "react-hot-toast";

function CreateTask({ onTaskCreated }) {
    const today = new Date().toISOString().split("T")[0];

    const [employees, setEmployees] = useState([])
    const [open, setOpen] = useState(false);
    const [assignModal, setAssignModal] = useState(false);
    const [search, setSearch] = useState("")
    const [saving, setSaving] = useState(false)

    const [form, setForm] = useState({
        title: "",
        description: "",
        start_date: "",
        due_date: "",
        assigned_to: null,
    });
    const selectedEmployee = employees.find(
        (emp) => emp._id === form.assigned_to
    );

    useEffect(() => {
        if (!assignModal) return;

        // const timer = setTimeout(async () => {
        //     const res = await getEmployeesAPI(search);
        //     setEmployees(res.employees);
        // }, 300);

        // return () => clearTimeout(timer);

        const fetchEmployees = async () => {
            const res = await getEmployeesAPI(search)
            setEmployees(res.employees);
        };

        fetchEmployees()
    }, [assignModal, search])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setSaving(true)

            await toast.promise(
                createTaskAPI(form), {
                loading: "Creating task...",
                success: (res) => {
                    onTaskCreated();
                    return res.message || "Task created successfully"
                },
                error: (err) => err.response?.data?.message || "Failed to create task"
            });

            setForm({
                title: "",
                description: "",
                start_date: "",
                due_date: "",
                assigned_to: null,
            });

            // setOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false)
        }
    }

    return (
        <>
            <section className="border border-gray-200 mb-10">

                {/* HEADER BUTTON */}
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                >
                    <div className="text-left">
                        <h2 className="text-lg font-medium">Create Task</h2>
                        <p className="text-sm text-gray-500">
                            Assign a task to an employee
                        </p>
                    </div>

                    <span className="text-xl">
                        {open ? "−" : "+"}
                    </span>
                </button>


                {/* COLLAPSIBLE FORM */}
                <div
                    className={`transition-all duration-300 overflow-hidden ${open ? "max-h-250 p-6 border-t border-gray-200" : "max-h-0"
                        }`}
                >
                    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                value={form.title}
                                placeholder="Enter task title"
                                onChange={(e) =>
                                    setForm({ ...form, title: e.target.value })
                                }
                                className="mt-2 px-3 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                rows="4"
                                placeholder="Enter task description"
                                value={form.description}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        description: e.target.value,
                                    })
                                }
                                className="mt-2 px-3 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">
                                Start Date
                            </label>
                            <input
                                type="date"
                                min={today}
                                value={form.start_date}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        start_date: e.target.value,
                                    })
                                }
                                className="mt-2 px-3 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-gray-700">
                                Due Date
                            </label>
                            <input
                                type="date"
                                min={form.start_date || today}
                                value={form.due_date}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        due_date: e.target.value,
                                    })
                                }
                                className="mt-2 px-3 py-2 border border-gray-300 rounded text-sm"
                            />
                        </div>

                        <div className="flex flex-col md:col-span-2">
                            <label className="text-sm font-medium text-gray-700">
                                Assigned Employee
                            </label>

                            <div className="mt-2">

                                {!selectedEmployee ? (
                                    <button
                                        type="button"
                                        onClick={() => setAssignModal(true)}
                                        value={form.assigned_to}
                                        className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                                    >
                                        Select Employee
                                    </button>
                                ) : (
                                    <div className="flex items-center justify-between border border-gray-300 rounded px-3 py-2">

                                        <div>
                                            <p className="text-sm font-medium">{selectedEmployee.name}</p>
                                            <p className="text-xs text-gray-500">{selectedEmployee.email}</p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setForm((prev) => ({ ...prev, assigned_to: null }))
                                            }
                                            className="text-red-500 text-sm ml-3"
                                        >
                                            ✕
                                        </button>

                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <button
                                type="submit"
                                disabled={saving}
                                className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm"
                            >
                                {saving ? "Creating..." : "Create Task"}
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            {/* Assign Modal (unchanged) */}
            {assignModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30">
                    <div className="bg-white w-full max-w-md p-6 border border-gray-200">
                        <h3 className="text-lg font-medium">
                            Assign Employee
                        </h3>
                        <p className="text-sm text-gray-600 mt-1"> Select an employee to assign this task. </p>

                        <div className="w-full mt-6">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search employees..."
                                className="w-full px-4 py-2 border border-gray-300 text-sm rounded 
                   focus:outline-none focus:ring-1 focus:ring-black 
                   placeholder:text-gray-400 transition"
                            />
                        </div>

                        <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
                            {employees.length === 0 && (
                                <div>
                                    <p className="text-sm font-medium text-gray-600">No data found</p>
                                </div>
                            )}
                            {employees.map((emp) => (
                                <div
                                    key={emp._id}
                                    onClick={() => {
                                        setForm({
                                            ...form,
                                            assigned_to: emp._id,
                                        });
                                        setAssignModal(false);
                                    }}
                                    className="p-3 border border-gray-200 cursor-pointer hover:bg-gray-50"
                                >
                                    <p className="text-sm font-medium">
                                        {emp.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {emp.email}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => {
                                    setSearch("")
                                    setAssignModal(false)
                                }}
                                className="px-4 py-2 text-sm border border-gray-300 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default CreateTask;