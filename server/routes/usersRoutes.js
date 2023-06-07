const express = require("express");
const router = express.Router();
const { verifyToken, isRequiredPassChange } = require("../utils/middleware");

const {
  getUsers,
  getAllUsersWithPagination,
  addUser,
  updateUser,
} = require("../controllers/usersController");

router
  .route("/")
  .get(verifyToken, isRequiredPassChange, getAllUsersWithPagination)
  .post(verifyToken, addUser);
router.route("/all").get(verifyToken, getUsers);
router.route("/:id").put(verifyToken, updateUser);

module.exports = router;
