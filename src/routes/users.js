const express = require("express");
const userController = require("../controllers/users");

const router = express.Router();

router
  .post("/", userController.createAccount)
  .get("/", userController.listAccounts)
  .put("/:id", userController.updateAccount)
  .delete("/:id", userController.deleteAccount)
  .get("/details/:id", userController.detailsAccount)
  .get("/search", userController.searchUsers);

module.exports = router;
