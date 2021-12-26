const express = require("express");
const userControllers = require("../controllers/users");

const router = express.Router();

router
  .post("/", userControllers.createUser)
  .get("/", userControllers.displayUsersList)
  .put("/:id", userControllers.updateUserInfo)
  .delete("/:id", userControllers.deleteUser)
  .get("/details/:id", userControllers.displaySelectedUser)
  .get("/search", userControllers.searchUsers);

module.exports = router;
