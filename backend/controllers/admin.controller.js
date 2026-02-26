const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/User");
const { mailPassword } = require("../utils/sentMail");

const createManager = async (req, res) => {
    const { name, email } = req.body

    try {
        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User with this email already exists" });
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
            message: "Manager account created and invitation email sent",
        });
    } catch (err) {
        console.log("Error manager creation: ", err);
        res.status(500).json({ message: "Server error" });
    }
}

module.exports = { createManager }
