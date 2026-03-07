import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

function Task() {
    const { user } = useAuth();

    // const isManager = user?.role === "MANAGER";

    const isManager = true;

    const [task, setTask] = useState({
        title: "Fix login bug",
        description:
            "Users cannot login when password contains special characters. Investigate backend validation and update the auth middleware.",
        status: "PENDING", // PENDING | IN_PROGRESS | COMPLETED
        assignedTo: {
            name: "Arjun Nair",
            email: "arjun@example.com"
        },
        createdAt: "2026-03-07",
        dueDate: "2026-03-08"
    });

    const [timeline] = useState([
        {
            id: 1,
            type: "COMMENT",
            message: "Investigating authentication middleware.",
            user: "Arjun Nair",
            createdAt: "2026-03-07T09:30:00"
        },
        {
            id: 2,
            type: "STARTED",
            message: "Started working on the task.",
            user: "Arjun Nair",
            createdAt: "2026-03-07T09:00:00"
        },
        {
            id: 3,
            type: "CREATED",
            message: "Task created by manager.",
            user: "Manager",
            createdAt: "2026-03-06T18:20:00"
        }
    ]);

    const [timer, setTimer] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [showStopModal, setShowStopModal] = useState(false)
    const [comment, setComment] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        let interval

        if (isRunning) {
            interval = setInterval(() => {
                setTimer(prev => prev + 1)
            }, 1000)
        }

        return () => clearInterval(interval)
    }, [isRunning])

    const formatTime = (seconds) => {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60

        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
    }

    const now = new Date();
    const due = new Date(task.dueDate);

    const diff = due - now;

    const hoursLeft = diff / (1000 * 60 * 60);

    let deadlineStatus = "NORMAL";

    if (diff < 0) {
        deadlineStatus = "OVERDUE";
    } else if (hoursLeft < 24) {
        deadlineStatus = "DUE_SOON";
    }

    const startTask = () => {
        setIsRunning(true)
        setTask((prev) => ({
            ...prev,
            status: "IN_PROGRESS"
        }));
    }

    const stopTask = () => {
        setIsRunning(false)
        setShowStopModal(true)
        setTask((prev) => ({
            ...prev,
            status: "COMPLETED"
        }));
    }

    const resumeTask = () => {
        setIsRunning(true)
        setShowStopModal(false)
    }

    const endTodayWork = () => {
        if (!validateComment()) return

        // API call example
        console.log("End today work with comment:", comment)

        setShowStopModal(false)
        setComment("")
    }

    const completeTask = () => {
        if (!validateComment()) return

        console.log("Complete task with comment:", comment)

        setShowStopModal(false)
        setComment("")
    }

    const validateComment = () => {
        if (!comment.trim()) {
            setError("Comment is required")
            return false
        }
        setError("")
        return true
    }

    return (
        <div className="max-w-3xl mx-auto">

            {/* INFORMATION */}
            <section className="border border-gray-200 p-6 mb-8">
                <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-semibold text-gray-900">
                        {task.title}
                    </h1>

                    {task.status === "UNTOUCHED" && (
                        <span className="text-xs px-2 py-1 border border-yellow-400 text-yellow-700">
                            NEW
                        </span>
                    )}
                </div>

                <p className="mt-4 text-gray-600 text-sm leading-relaxed">
                    {task.description}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-medium mt-1"><span
                            className={`px-2 py-1 text-xs font-medium border 
                                ${task.status === "UNTOUCHED"
                                    ? "border-gray-300 text-gray-600"
                                    : task.status === "IN_PROGRESS"
                                        ? "border-blue-400 text-blue-600"
                                        : "border-green-400 text-green-600"
                                }`}
                        >
                            {task.status}
                        </span></p>
                    </div>

                    <div>
                        <p className="text-gray-500">Created</p>
                        <p className="font-medium mt-1">
                            {new Date(task.createdAt).toLocaleDateString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-500">Due</p>
                        <p className="font-medium mt-1">
                            {new Date(task.dueDate).toLocaleDateString()}
                        </p>

                        {task.status !== "COMPLETED" && deadlineStatus === "DUE_SOON" && (
                            <p className="text-orange-600 text-xs mt-1">
                                ⚠ Due within 24 hours
                            </p>
                        )}

                        {task.status !== "COMPLETED" && deadlineStatus === "OVERDUE" && (
                            <p className="text-red-600 text-xs mt-1">
                                Task overdue
                            </p>
                        )}
                    </div>
                </div>
            </section>


            {/* ASSIGNED EMPLOYEE (Manager only) */}
            {isManager && (
                <section className="border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-medium mb-4">
                        Assigned Employee
                    </h2>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                            <p className="font-medium">{task.assignedTo.name}</p>
                        </div>

                        <div className="text-sm text-gray-500">
                            <p className="text-sm text-gray-500">
                                {task.assignedTo.email}
                            </p>
                        </div>
                    </div>
                </section>
            )}

            {/* EMPLOYEE ACTIONS */}
            {!isManager && (
                <section className="border border-gray-200 p-6 mb-8">
                    <h2 className="text-lg font-medium mb-4">
                        Actions
                    </h2>

                    {isRunning && (
                        <div className="mb-4 text-sm text-gray-700 font-medium">
                            ⏱ Running: {formatTime(timer)}
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row gap-3">

                        <button
                            onClick={startTask}
                            disabled={task.status !== "PENDING" || isRunning}
                            className={`px-5 py-2 border text-sm transition 
                                ${task.status === "PENDING" && !isRunning
                                    ? "border-black hover:bg-black hover:text-white"
                                    : "border-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Start Task
                        </button>

                        <button
                            onClick={stopTask}
                            disabled={!isRunning}
                            className={`px-5 py-2 border text-sm transition 
                                ${isRunning
                                    ? "border-black hover:bg-black hover:text-white"
                                    : "border-gray-200 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Stop Task
                        </button>
                    </div>
                </section>
            )}

            {/* TIMELINE */}
            <section className="border border-gray-200 p-6 mt-8">
                <h2 className="text-lg font-medium mb-6">
                    Activity Tracker
                </h2>

                <div className="flex flex-col text-sm">
                    {timeline.map((item, index) => (
                        <div key={item.id} className="flex flex-col">

                            <div className="pb-6">

                                <h3 className="text-sm font-medium text-gray-900">
                                    {item.message}
                                </h3>

                                <p className="text-xs text-gray-400 mt-1">
                                    {item.user} • {new Date(item.createdAt).toLocaleString()}
                                </p>

                            </div>

                            {index !== timeline.length - 1 && (
                                <div className="h-6 border-l border-gray-200 ml-1" />
                            )}

                        </div>
                    ))}
                </div>
            </section>

            {showStopModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white p-6 w-full max-w-md border border-gray-200 rounded-lg">

                        <h3 className="text-lg font-semibold mb-2">
                            Stop Task
                        </h3>

                        <p className="text-sm text-gray-600 mb-5">
                            You're about to stop the running timer. Add a comment and choose how you want to proceed.
                        </p>

                        {/* Comment */}
                        <div className="mb-4">
                            <label className="text-sm font-medium text-gray-700">
                                Comment
                            </label>

                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Describe what was completed or current progress..."
                                className="w-full mt-2 border border-gray-300 p-3 text-sm resize-none focus:outline-none focus:border-black"
                                rows={4}
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-xs mb-3">
                                {error}
                            </p>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3">

                            <button
                                onClick={endTodayWork}
                                className="flex-1 border px-4 py-2 text-sm hover:bg-gray-100"
                            >
                                End Today's Work
                            </button>

                            <button
                                onClick={completeTask}
                                className="flex-1 border border-green-500 text-green-600 px-4 py-2 text-sm hover:bg-green-50"
                            >
                                Complete Task
                            </button>

                            <button
                                onClick={resumeTask}
                                className="flex-1 border border-gray-300 text-gray-600 px-4 py-2 text-sm hover:bg-gray-50"
                            >
                                Resume Timer
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default Task;