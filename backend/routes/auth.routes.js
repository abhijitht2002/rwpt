const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

router.post("/generate-otp", authController.generateOTP);
router.post("/verify", authController.verifyOTP);
router.post("/register", authController.register);

router.post("/forgot-password", authController.forgotPassword);
router.post("/forgot-password/reset", authController.passwordReset);

router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.get("/me", protect, authController.getMe);

module.exports = router;
