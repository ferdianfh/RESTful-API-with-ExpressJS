const express = require("express");
const userController = require("../controller/users");
const commonMiddle = require("../middleware/custMiddle");
const validation = require("../middleware/validation");

const router = express.Router();

router
  .post("/registration", userController.signUp)
  .post("/login", userController.login)
  .put(
    "/profile",
    validation.validateUpdateProfile,
    userController.updateProfile
  )
  .post("/", commonMiddle.isAdmin, userController.createAccount)
  .get("/", commonMiddle.isAdmin, userController.listAccounts)
  .put("/:id", commonMiddle.isAdmin, userController.updateAccount)
  .delete("/:id", commonMiddle.isAdmin, userController.deleteAccount)
  .get("/details/:id", commonMiddle.isAdmin, userController.detailsAccount)
  .get("/search", commonMiddle.isAdmin, userController.searchUsers);

module.exports = router;
