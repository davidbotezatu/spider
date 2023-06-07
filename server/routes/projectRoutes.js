const express = require("express");
const router = express.Router();
const { verifyToken, isRequiredPassChange } = require("../utils/middleware");

const {
  getAllProjectsWithPagination,
  addNewProject,
  updateProject,
} = require("../controllers/projectController");

router
  .route("/")
  .get(verifyToken, isRequiredPassChange, getAllProjectsWithPagination)
  .post(verifyToken, addNewProject);

router.route("/:id").put(verifyToken, updateProject);

module.exports = router;
