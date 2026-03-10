const User = require("../models/User");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const { mailOTP } = require("../utils/sentMail");

const generateOTP = async (req, res) => {
  try {
    const { email } = req.body

    const exists = await User.findOne({ email })
    if (exists && exists.isVerified) return res.status(409).json({ success: false, message: "Email already registered" })

    if (exists && exists.googleId) {
      return res.status(409).json({
        success: false,
        message: "This email is registered with Google"
      });
    }

    // if (exists && exists.otpExpires > Date.now() - 30 * 1000) {
    //   return res.status(429).json({ message: "Wait before requesting new OTP" });
    // }

    const otp = crypto.randomInt(100000, 999999).toString()
    const otpExpires = Date.now() + 10 * 60 * 1000

    if (exists) {
      exists.otp = otp;
      exists.otpExpires = otpExpires;
      exists.otpPurpose = "signup";

      await exists.save();
    } else {
      await User.create({
        email,
        otp,
        otpExpires,
        otpPurpose: "signup",
        isVerified: false
      });
    }

    await mailOTP(email, otp)

    res.status(200).json({ success: true, message: `OTP sent to ${email}` })
  } catch (error) {
    console.log("Can't generate OTP", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body

    const user = await User.findOne({ email })
    if (!user || user.otp !== otp) return res.status(400).json({ success: false, message: "Invalid OTP" });

    if (user.otpExpires < Date.now()) return res.status(400).json({ success: false, message: "OTP expired" });

    // REGISTER FLOW
    if (user.otpPurpose === "signup") {
      if (user.isVerified) return res.status(409).json({ success: false, message: "Already verified" });

      user.isVerified = true
      user.otp = null;
      user.otpExpires = null;
      // user.otpPurpose = null;

      await user.save()

      res.status(200).json({ success: true, message: "Email verification complete" });
    }

    // FORGOT PASSWORD FLOW
    if (user.otpPurpose === "reset") {

      user.otp = null;
      user.otpExpires = null;
      // user.otpPurpose = null;

      await user.save();

      return res.status(200).json({
        success: true,
        message: "OTP verification successful"
      });
    }
  } catch (error) {
    console.log("OTP verification failed", error);
    res.status(500).json({ success: false, message: "Server error", error: error });
  }
}

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(404).json({ success: false, message: "Fields required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (user.googleId)
      return res.status(400).json({ success: false, message: "This email is registered with Google" });

    if (!user.isVerified)
      return res.status(403).json({ success: false, message: "Email not verified" });

    if (user.otpPurpose !== "signup")
      return res.status(403).json({
        success: false,
        message: "OTP verification required"
      });

    const hashPass = await bcrypt.hash(password, 10);

    user.name = name
    user.passwordHash = hashPass
    user.role = "EMPLOYEE"
    user.status = "ACTIVE"
    user.provider = "LOCAL"
    user.otpPurpose = null;

    await user.save();

    res.status(200).json({ success: true, message: "User registered" });
  } catch (err) {
    console.log("Error register", err);
    res.status(500).json({ success: false, error: "Registration failed" });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    const exists = await User.findOne({ email })
    if (!exists) return res.status(404).json({ success: false, message: "Email doesn't exist" })
    if (exists.googleId) return res.status(409).json({ success: false, message: "This account uses Google login" });
    if (!exists.isVerified) return res.status(403).json({ success: false, message: "You need to verify first" })

    // if (exists && exists.otpExpires > Date.now() - 30 * 1000) {
    //   return res.status(429).json({ message: "Wait before requesting new OTP" });
    // }

    const otp = crypto.randomInt(100000, 999999).toString()
    const otpExpires = Date.now() + 10 * 60 * 1000

    exists.otp = otp;
    exists.otpExpires = otpExpires;
    exists.otpPurpose = "reset";

    await exists.save();

    await mailOTP(email, otp)
    res.status(200).json({ success: true, message: "OTP sent to mail" })
  } catch (error) {
    console.log("Can't generate OTP", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

const passwordReset = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found"
      });

    if (user.googleId)
      return res.status(400).json({
        success: false,
        message: "This account uses Google login"
      });

    if (!user.isVerified)
      return res.status(403).json({
        success: false,
        message: "Account not verified"
      });

    if (user.otpPurpose !== "reset")
      return res.status(403).json({
        success: false,
        message: "OTP verification required"
      });

    const hashPass = await bcrypt.hash(password, 10);

    user.passwordHash = hashPass
    user.otpPurpose = null;

    await user.save();

    res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (err) {
    console.log("Error register", err);
    res.status(500).json({ success: false, error: "Password change failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({ message: "Fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7days
    })

    res.status(200).json({
      success: true,
      message: "Login Successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.log("Error login", err);
    res.status(404).json({ message: "Login failed" });
  }
};

const refresh = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(
      token,
      env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decoded.id);
    if (!user) return res.sendStatus(401);

    const newAccessToken = generateAccessToken(user);

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.sendStatus(403);
  }
}

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "Strict",
    secure: env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
}

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        status: user.status
      },
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { generateOTP, verifyOTP, register, forgotPassword, passwordReset, login, refresh, logout, getMe };
