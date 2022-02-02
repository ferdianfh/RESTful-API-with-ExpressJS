const express = require("express");
const userControllers = require("../controller/users");
const { verifyAccess, isAdmin, verifyEmail } = require("../middleware/auth");
const upload = require("../middleware/upload");
const { validatePhoneNumber } = require("../middleware/validation");

const router = express.Router();

router
  .post("/register", userControllers.signUp)
  .post("/login", userControllers.login)
  .get("/", verifyAccess, userControllers.listAccounts)
  .get("/profile", verifyAccess, userControllers.profile)
  .put(
    "/profile/picture",
    verifyAccess,
    upload.single("picture"),
    userControllers.addProfilePicture
  )
  .put(
    "/profile",
    verifyAccess,
    validatePhoneNumber,
    userControllers.addPhoneNumber
  )
  .delete("/profile/:id", verifyAccess, isAdmin, userControllers.deleteAccount)
  .get("/verification/:token", verifyEmail, userControllers.verifyAccount);

module.exports = router;
