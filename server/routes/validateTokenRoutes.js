const express = require("express");
const router = express.Router();
const { verifyToken } = require("../utils/middleware");
const { validateToken } = require("../controllers/validateTokenController");

router.route("/").post(verifyToken, validateToken);

module.exports = router;
