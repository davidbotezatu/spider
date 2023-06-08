const UserRole = require("../models/UserRole");

exports.getUserRoles = async (req, res) => {
  try {
    const roles = await UserRole.findAll();
    res.json(roles);
  } catch (error) {
    console.log("Eroare userRolesController - getUserRoles: ", error);
    res.status(500).json({ error: "Server error" });
  }
};
