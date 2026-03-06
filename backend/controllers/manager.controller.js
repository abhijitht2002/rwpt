const Task = require("../models/Task");
const User = require("../models/User");

const createTask = async (req, res) => {
    try {
        const { title,
            description,
            start_date,
            due_date,
            assigned_to, } = req.body

        if (!title || !description || !start_date || !due_date) {
            return res.status(400).json({ success: false, message: "Required fields missing" });
        }

        if (new Date(start_date) > new Date(due_date)) {
            return res.status(400).json({
                success: false,
                message: "Due date must be after start date"
            })
        }

        const task = new Task({
            title,
            description,
            status: "UNTOUCHED",
            start_date,
            due_date,
            assigned_by: req.user.id,
            assigned_to: assigned_to || null
        })

        await task.save()

        res.status(201).json({
            success: true,
            message: "Task created successfully",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to create task"
        });
    }
}

const getEmployees = async (req, res) => {
    try {
        const { search } = req.query;

        let query = { role: "EMPLOYEE" };

        // search by name or email
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { email: { $regex: search, $options: "i" } }
            ];
        }

        const employees = await User.find(query)
            .select("_id name email")
            .sort({ name: 1 });

        res.status(200).json({
            success: true,
            employees
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch employees"
        });
    }
}

module.exports = { getEmployees, createTask }
