const express = require("express");
const userControllers = require("../controllers/adminUsers");

const route = express.Router();

route
  .post("/input", userControllers.inputUser)
  .get("/list", userControllers.displayUserslist)
  .put("/update/:id", userControllers.updateUserInfo)
  .delete("/remove/:id", userControllers.deleteUser)
  .get("/details/:id", userControllers.displaySelectedUser)
  .get("/search", userControllers.searchUsers);

module.exports = route;
