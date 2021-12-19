const express = require("express");
const userControllers = require("../controllers/adminUsers");

const route = express.Router();

route
  .post("/create", userControllers.createUser)
  .get("/list", userControllers.displayUsersList)
  .put("/update/:id", userControllers.updateUserInfo)
  .delete("/remove/:id", userControllers.deleteUser)
  .get("/details/:id", userControllers.displaySelectedUser)
  .get("/search", userControllers.searchUsers);

module.exports = route;
