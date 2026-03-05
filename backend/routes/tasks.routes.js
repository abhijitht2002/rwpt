const express = require("express");
const router = express.Router();
const { listTasks } = require("../controllers/tasks.controller");
const { protect, role } = require("../middlewares/auth.middleware");

router.get("/:filter", protect, role("MANAGER", "EMPLOYEE"), listTasks);

module.exports = router;
