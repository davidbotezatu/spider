const express = require("express");
const router = express.Router();
const {
  resetPassReq,
  passUpdate,
} = require("../controllers/resetPassController");

router.route("/").post(resetPassReq).put(passUpdate);

module.exports = router;
