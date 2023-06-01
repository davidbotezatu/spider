const express = require("express");
const router = express.Router();

const {
  getUsers,
  getAllUsersWithPagination,
  addUser,
  updateUser,
} = require("../controllers/usersController");

router.route("/").get(getAllUsersWithPagination).post(addUser);
router.route("/all").get(getUsers);
router.route("/:id").put(updateUser);

module.exports = router;
