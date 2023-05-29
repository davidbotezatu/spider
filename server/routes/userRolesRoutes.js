const express = require("express");
const router = express.Router();

const UserRole = require("../models/UserRole");

router.get("/", async (req, res) => {
  try {
    const roles = await UserRole.findAll();
    res.json(roles);
  } catch (error) {
    console.log("Rolurile nu pot fi preluate: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
