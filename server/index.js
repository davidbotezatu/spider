const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));

const sequelize = require("./config/database");

const { addAdmin } = require("./sql/addAdmin");
const { addUserRoles } = require("./sql/addUserRoles");

const usersRoutes = require("./routes/usersRoutes");
const userRoleRoutes = require("./routes/userRolesRoutes");

// Sync the database models
sequelize
  .sync()
  .then(async () => {
    await addUserRoles();
    await addAdmin();
    app.use("/api/users", usersRoutes);
    app.use("/api/userroles", userRoleRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
