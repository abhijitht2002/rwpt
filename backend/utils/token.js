const env = require("../config/env");
const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user._id, role: user.role, name: user.name },
        env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
    )
}

const generateRefreshToken = (user) => {
    return jwt.sign(
        { id: user._id },
        env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" } // long-lived
    )
}

module.exports = { generateAccessToken, generateRefreshToken }