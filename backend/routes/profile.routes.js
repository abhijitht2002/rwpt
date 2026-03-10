const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profile.controller");
const { protect } = require("../middlewares/auth.middleware");

router.get("/", protect, profileController.getProfile);
router.patch("/avatar", protect, profileController.changeAvatar);
router.patch("/password", protect, profileController.changePassword);

module.exports = router;
