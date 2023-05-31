const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const randomPass = require("../utils/generatePassword");
const sendEmail = require("../utils/sendEmail");

const User = require("../models/User");
const UserRole = require("../models/UserRole");

// Get all users for the Users.jsx (show all users in table)
router.get("/", async (req, res) => {
  try {
    const { page, limit, sortBy } = req.query;

    const users = await User.findAndCountAll({
      include: [{ model: UserRole, as: "role" }],
      order: [["nume", sortBy === "desc" ? "DESC" : "ASC"]],
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });

    const totalPages = Math.ceil(users.count / limit);

    res.json({ users: users.rows, totalPages });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { nume, prenume, email, avatar, rol, schimbaParola } = req.body;

    // Generate and hash the password
    const pass = randomPass;
    const hashedPassword = await bcrypt.hash(pass, 10);

    // Create a new user with the hashed password
    const newUser = await User.create({
      nume,
      prenume,
      email,
      parola: hashedPassword,
      avatar,
      rol,
      schimbaParola,
    });

    res.json(newUser);
    sendEmail(email, pass);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Update an existing user
router.put("/:id", async (req, res) => {
  try {
    const { avatar, nume, prenume, email, parola, rol, schimbaParola } =
      req.body;
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update the user fields
    user.avatar = avatar;
    user.nume = nume;
    user.prenume = prenume;
    user.email = email;
    user.rol = rol;
    user.schimbaParola = schimbaParola;
    if (parola) {
      user.parola = await bcrypt.hash(parola, 10);
      sendEmail(email);
    }

    // Save the updated user
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
