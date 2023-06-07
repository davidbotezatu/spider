const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/middleware");
const { getTaskStatus } = require("../controllers/taskStatusController");

router.route("/").get(verifyToken, getTaskStatus);

module.exports = router;
