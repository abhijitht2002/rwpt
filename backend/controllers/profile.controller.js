const User = require("../models/User");
const bcrypt = require("bcrypt");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-passwordHash");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            user
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const changeAvatar = async (req, res) => {
    try {
        const { avatar } = req.body

        if (!avatar) {
            return res.status(400).json({
                success: false,
                message: "Avatar URL is required"
            });
        }

        const user = await User.findById(req.user.id).select("-passwordHash");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.avatar = avatar
        await user.save()

        res.json({
            success: true,
            message: "Avatar changed successfully",
            avatar: avatar
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Fields required"
            });
        }

        if (oldPassword === newPassword) {
            return res.status(400).json({
                success: false,
                message: "New password must be different from old password"
            });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (!user.passwordHash) {
            return res.status(400).json({
                success: false,
                message: "Password login not enabled for this account"
            });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.passwordHash);
        if (!isMatch)
            return res.status(401).json({ success: false, message: "Invalid credentials" });

        const hashPass = await bcrypt.hash(newPassword, 10);

        user.passwordHash = hashPass

        if (user.status === "INVITED") {
            user.status = "ACTIVE"
        }

        await user.save()

        res.json({
            success: true,
            message: "Password reset successful",
        });
    } catch (err) {
        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}

module.exports = { getProfile, changeAvatar, changePassword }