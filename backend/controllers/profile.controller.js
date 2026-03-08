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
    const { image } = req.body
    try {
        const user = await User.findById(req.user.id).select("-passwordHash");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.avatar = image
        await user.save()

        res.json({
            success: true,
            message: "Avatar changed successfully",
            avatar: image
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