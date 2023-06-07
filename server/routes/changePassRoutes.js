const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/middleware");
const { changePassword } = require("../controllers/changePassController");

router.route("/").put(verifyToken, changePassword);

module.exports = router;
