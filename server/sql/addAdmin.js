const User = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const createAdminUser = async () => {
  const parola = process.env.ADMIN_PASS;
  const hashedPass = await bcrypt.hash(parola, 10);

  try {
    // Check if admin user already exists
    const existingAdminUser = await User.findOne({ rol: "admin" });
    if (existingAdminUser) {
      console.log("Admin user already exists:", existingAdminUser.toJSON());
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      email: "admin@company.ro",
      nume: "Admin",
      prenume: "Admin",
      rol: "Administrator",
      parola: hashedPass,
    });

    console.log("Admin user created:", adminUser.toJSON());
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

module.exports = {
  createAdminUser,
};
