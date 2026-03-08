const env = require("../config/env");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");

const googleCallback = async (req, res) => {
    try {
        const user = req.user

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token in httpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: env.NODE_ENV === "production",
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
        })

        res.redirect(`${env.CLIENT_URL}/account/oauth-success`)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "OAuth login failed" });
    }
}

module.exports = { googleCallback }
