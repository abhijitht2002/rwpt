import { useState } from "react";

function CreateTask() {
    const [assignModal, setAssignModal] = useState(false);

    const [form, setForm] = useState({
        title: "",
        description: "",
        start_date: "",
        due_date: "",
        assigned_to: null,
    });

    const employees = [
        { _id: 1, name: "John Doe", email: "john@email.com" },
        { _id: 2, name: "Sarah Smith", email: "sarah@email.com" },
        { _id: 3, name: "David Lee", email: "david@email.com" },
        { _id: 4, name: "John Lee", email: "david@email.com" },
        { _id: 5, name: "John Lee", email: "david@email.com" },
    ];

    return (
        <>
            <section className="border border-gray-200 p-8 mb-12">
                <h2 className="text-xl font-medium">Create a task</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Fill the task details and assign it to an employee.
                </p>

                <form className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="flex flex-col md:col-span-2">
                        <label className="text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
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

                        <button
                            type="button"
                            onClick={() => setAssignModal(true)}
                            className="mt-2 px-4 py-2 border border-gray-300 rounded text-sm text-left hover:bg-gray-50"
                        >
                            Select Employee
                        </button>
                    </div>

                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="px-6 py-2 border border-black text-black hover:bg-black hover:text-white transition text-sm"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </section>

            {/* Assign Modal */}
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
                                //   value={value}
                                //   onChange={onChange}
                                placeholder="Search employees..."
                                className="w-full px-4 py-2 border border-gray-300 text-sm rounded 
                   focus:outline-none focus:ring-1 focus:ring-black 
                   placeholder:text-gray-400 transition"
                            />
                        </div>

                        <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
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
                                onClick={() => setAssignModal(false)}
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
