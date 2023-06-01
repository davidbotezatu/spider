const express = require("express");
const router = express.Router();

const {
  getAllProjectsWithPagination,
  addNewProject,
  updateProject,
} = require("../controllers/projectController");

router.route("/").get(getAllProjectsWithPagination).post(addNewProject);

router.put("/:id", updateProject);

module.exports = router;
