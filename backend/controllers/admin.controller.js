const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");
const { mailPassword } = require("../utils/sentMail");

const createManager = async (req, res) => {
    const { name, email } = req.body

    try {
        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Name and email are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "User with this email already exists" });
        }

        const tempPass = crypto.randomBytes(8).toString("hex")
        const hashPass = await bcrypt.hash(tempPass, 10)

        const user = new User({
            name,
            email,
            role: "MANAGER",
            passwordHash: hashPass,
            status: "INVITED"
        })

        await mailPassword(name, email, tempPass)

        await user.save()

        res.status(201).json({
            success: true,
            message: "Manager account created and invitation email sent",
        });
    } catch (err) {
        console.log("Error while creating manager: ", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const listManagers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const total = await User.countDocuments({ role: "MANAGER" });

        const managers = await User.find({ role: "MANAGER" })
            .select("-passwordHash")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        if (managers.length === 0) return res.status(200).json({
            success: true,
            data: managers,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });

        res.status(200).json({
            success: true,
            data: managers,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });

    } catch (err) {
        console.log("Error fetching managers: ", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const getManagerById = async (req, res) => {
    try {
        const manager = await User.findById(req.params.id).select("-passwordHash")
        if (!manager) return res.status(404).json({ success: false, message: "Manager does not exist" });

        res.status(200).json({
            success: true,
            manager
        });

    } catch (err) {
        console.log("Error fetching manager: ", err);
        res.status(500).json({ message: "Server error" });
    }
}

const listEmployees = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        const total = await User.countDocuments({ role: "EMPLOYEE" });

        const employees = await User.find({ role: "EMPLOYEE" })
            .select("-passwordHash")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });
        if (employees.length === 0) return res.status(200).json({
            success: true,
            data: employees,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });

        res.status(200).json({
            success: true,
            data: employees,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        });

    } catch (err) {
        console.log("Error fetching employees: ", err);
        res.status(500).json({ message: "Server error" });
    }
}

const getEmployeeById = async (req, res) => {
    try {
        const employee = await User.findById(req.params.id).select("-passwordHash")
        if (!employee) return res.status(404).json({ success: false, message: "Employee does not exist" });

        res.status(200).json({
            success: true,
            employee
        });
    } catch (err) {
        console.log("Error fetching employee: ", err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { createManager, listManagers, getManagerById, listEmployees, getEmployeeById }
