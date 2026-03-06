const express = require("express");
const router = express.Router();
const { protect, role } = require("../middlewares/auth.middleware");
const { getEmployees, createTask } = require("../controllers/manager.controller");

router.get("/employees", protect, role("MANAGER"), getEmployees);
router.post("/tasks", protect, role("MANAGER"), createTask);

module.exports = router;
