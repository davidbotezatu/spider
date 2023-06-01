const express = require("express");
const router = express.Router();

const { getUserRoles } = require("../controllers/userRolesController");

router.route("/").get(getUserRoles);

module.exports = router;
