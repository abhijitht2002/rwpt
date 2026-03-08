const User = require("../models/User");

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

module.exports = { getProfile, changeAvatar }