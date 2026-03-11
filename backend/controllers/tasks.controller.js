const Task = require("../models/Task");
const Timelog = require("../models/Timelog");
const User = require("../models/User");

const listTasks = async (req, res) => {
    try {
        const { filter } = req.params
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const query = {}

        if (req.user.role === "MANAGER") {
            query.assigned_by = req.user.id

            switch (filter) {
                case "assigned":
                    query.assigned_to = { $ne: null }
                    break

                case "unassigned":
                    query.assigned_to = null
                    break

                case "closed":
                    query.status = "COMPLETED"
                    break

                default:
                    return res.status(400).json({ message: "Invalid filter" })
            }
        } else if (req.user.role === "EMPLOYEE") {
            query.assigned_to = req.user.id

            switch (filter) {
                case "upcoming":
                    query.start_date = { $gt: new Date() }
                    query.status = { $ne: "COMPLETED" }
                    break

                case "pending":
                    query.start_date = { $lte: new Date() }
                    query.status = { $ne: "COMPLETED" }
                    break

                case "completed":
                    query.status = "COMPLETED"
                    break

                default:
                    return res.status(400).json({ message: "Invalid filter" })
            }
        }

        const tasks = await Task.paginate(query, {
            page,
            limit,
            sort: { createdAt: -1 },
            populate: ["assigned_to", "assigned_by"],
        })

        res.status(200).json({
            success: true,
            data: tasks.docs,
            pagination: {
                total: tasks.totalDocs,
                page: tasks.page,
                limit: tasks.limit,
                totalPages: tasks.totalPages,
            },
        });
    } catch (err) {
        console.log("Error while fetching tasks: ", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const getTaskById = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        let assignee;

        if (req.user.role === "MANAGER") {
            assignee = await User.findById(task.assigned_to)
        } else if (req.user.role === "EMPLOYEE") {
            assignee = await User.findById(task.assigned_by)
        }

        const logs = await Timelog.find({
            task: task._id,
            end: { $ne: null }
        }).sort({ end: -1 })

        res.status(200).json({
            success: true,
            task,
            assignee,
            logs
        });
    } catch (err) {
        console.log("Error while fetching task: ", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const startTask = async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }
        if (task.status === "COMPLETED") {
            return res.status(400).json({
                success: false,
                message: "Can't start a completed task"
            });
        }

        const active = await Timelog.findOne({
            working_by: req.user.id,
            end: null
        })
        if (active) {
            return res.status(400).json({
                success: false,
                message: "You already have a running task"
            })
        }

        const log = new Timelog({
            status: "IN_PROGRESS",
            working_by: req.user.id,
            task: task._id,
            start: new Date()
        })

        await log.save()

        if (task.status === "UNTOUCHED") {
            task.status = "IN_PROGRESS"
            await task.save()
        }

        res.status(200).json({
            success: true,
            message: "Task started..."
        });
    } catch (err) {
        console.log("Error while running task: ", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const endTask = async (req, res) => {
    const { id } = req.params
    const { comment } = req.body
    const t = req.query.t

    try {
        const log = await Timelog.findOne({
            working_by: req.user.id,
            task: id,
            end: null
        })
        if (!log) {
            return res.status(404).json({
                success: false,
                message: "No active task found"
            });
        }

        if (t === "e") {
            log.status = "COMPLETED"
            await Task.findByIdAndUpdate(id, { status: "COMPLETED" })
        } else {
            log.status = "IN_PROGRESS"
        }

        log.comment = comment

        const end = new Date()
        log.end = end
        log.duration = (end - log.start) / 1000 // secs

        await log.save()

        res.status(200).json({
            success: true,
            message: `Task ended...`
        });
    } catch (err) {
        console.log("Error while ending task: ", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const searchTask = async (req, res) => {
    try {
        const { search } = req.query

        let query = {};

        if (req.user.role === "MANAGER") {
            query.assigned_by = req.user.id
        } else if (req.user.role === "EMPLOYEE") {
            query.assigned_to = req.user.id
        }

        if (search) {
            query.title = { $regex: search, $options: "i" }
        }

        const tasks = await Task.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            tasks
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch tasks"
        });
    }
}

module.exports = { searchTask, listTasks, getTaskById, startTask, endTask }
