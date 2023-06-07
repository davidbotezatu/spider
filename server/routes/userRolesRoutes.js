const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/middleware");
const { getUserRoles } = require("../controllers/userRolesController");

router.route("/").get(verifyToken, getUserRoles);

module.exports = router;
