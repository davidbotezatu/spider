const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const { page, sortBy, limit } = req.query;

    const projects = await Project.findAndCountAll({
      include: [{ model: User, as: "responsible" }],
      order: [["nume", sortBy === "desc" ? "DESC" : "ASC"]],
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });

    const totalPages = Math.ceil(projects.count / limit);

    res.json({ projects: projects.rows, totalPages });
  } catch (error) {
    console.log("Proiectele nu pot fi preluate: ", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
