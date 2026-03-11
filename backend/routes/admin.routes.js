const express = require("express");
const router = express.Router();
const { createManager, listManagers, getManagerById, getEmployeeById, listEmployees, searchEmployees, searchManagers } = require("../controllers/admin.controller");
const { protect, role } = require("../middlewares/auth.middleware");

router.post("/managers", protect, role("ADMIN"), createManager);
router.get("/managers", protect, role("ADMIN"), listManagers);
router.get("/managers/search", protect, role("ADMIN"), searchManagers);
router.get("/managers/:id", protect, role("ADMIN"), getManagerById);
router.get("/employees", protect, role("ADMIN"), listEmployees);
router.get("/employees/search", protect, role("ADMIN"), searchEmployees);
router.get("/employees/:id", protect, role("ADMIN"), getEmployeeById);

module.exports = router;
