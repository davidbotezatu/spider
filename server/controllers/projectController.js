const Project = require("../models/Project");
const User = require("../models/User");

exports.getAllProjectsWithPagination = async (req, res) => {
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
    console.log(
      "Eroare projectController - getAllProjectsWithPagination: ",
      error
    );
    res.status(500).json({ message: "Server error" });
  }
};

exports.addNewProject = async (req, res) => {
  try {
    if (req.user.role !== "Administrator") {
      return res.status(403).json({ message: "Permisiuni insuficiente." });
    }

    const { avatar, nume, descriere, responsabil } = req.body;

    await Project.create({ avatar, nume, descriere, responsabil });
    res.status(200).json({ message: "Proiect creat cu succes" });
  } catch (error) {
    console.error("Eroare projectController - addNewProject:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProject = async (req, res) => {
  try {
    if (req.user.role !== "Administrator") {
      return res.status(403).json({ message: "Permisiuni insuficiente." });
    }

    const { avatar, nume, descriere, responsabil } = req.body;
    const project = await Project.findByPk(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    await project.update({ avatar, nume, descriere, responsabil });
    res.status(200).json({ message: "Proiect modificat cu succes" });
  } catch (error) {
    console.error("Eroare projectController - updateProject:", error);
    res.status(500).json({ message: "Server error" });
  }
};
