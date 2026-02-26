const express = require("express");
const router = express.Router();
const { createManager } = require("../controllers/admin.controller");

router.post("/managers", createManager);

module.exports = router;
