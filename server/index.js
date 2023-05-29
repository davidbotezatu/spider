const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "http://localhost:5173" }));

// Import your Sequelize models and database connection
const sequelize = require("./config/database");

// Import the addAdmin.js script
const { createAdminUser } = require("./sql/addAdmin");

//import routes
const usersRoutes = require("./routes/usersRoutes");

// Sync the database models
sequelize
  .sync()
  .then(async () => {
    // Execute the addAdmin.js script to create the admin user
    await createAdminUser();
    app.use("/api/users", usersRoutes);

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
