const express = require("express");
const router = express.Router();

const User = require("../models/User");
const UserRole = require("../models/UserRole");

// Get all users for the Users.jsx (show all users in table)
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: [{ model: UserRole, as: "role" }], // Include the associated UserRole model
    });

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new user
router.post("/users", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
