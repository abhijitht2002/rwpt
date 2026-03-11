const express = require("express");
const router = express.Router();
const { listTasks, getTaskById, startTask, endTask, searchTask } = require("../controllers/tasks.controller");
const { protect, role } = require("../middlewares/auth.middleware");

router.get("/search", protect, role("MANAGER", "EMPLOYEE"), searchTask);
router.get("/filter/:filter", protect, role("MANAGER", "EMPLOYEE"), listTasks);
router.get("/:id", protect, role("MANAGER", "EMPLOYEE"), getTaskById);
router.post("/:id/start", protect, role("EMPLOYEE"), startTask);
router.post("/:id/stop", protect, role("EMPLOYEE"), endTask);

module.exports = router;
