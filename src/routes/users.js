const express = require("express");
const userControllers = require("../controller/users");
const { verifyAccess, isAdmin } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router
  .post("/register", userControllers.signUp)
  .post("/login", userControllers.login)
  .get("/", verifyAccess, userControllers.listAccounts)
  .get("/profile", verifyAccess, userControllers.profile)
  .put(
    "/profile",
    verifyAccess,
    upload.single("picture"),
    userControllers.addProfilePicture
  )
  .delete("/profile/:id", verifyAccess, isAdmin, userControllers.deleteAccount);

module.exports = router;
