const express = require("express");
const userControllers = require("../controller/users");
const { verifyAccess, isAdmin, verifyEmail } = require("../middleware/auth");
// const {
//   hitChacheProfileId,
//   clearProfileInRedis
// } = require("../middleware/redis");
const upload = require("../middleware/upload");
const { validatePhoneNumber } = require("../middleware/validation");

const router = express.Router();

router
  .post("/register", userControllers.signUp)
  .post("/login", userControllers.login)
  .get("/verification/:token", verifyEmail, userControllers.verifyAccount)
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
  .put(
    "/profile/delete-phone-number",
    verifyAccess,
    userControllers.deletePhoneNumber
  )
  .put("/profile/change-password", verifyAccess, userControllers.changePassword)
  .put("/PIN/:id", userControllers.createPinById)
  .delete("/profile/:id", verifyAccess, isAdmin, userControllers.deleteAccount)
  .get("/details/:id", verifyAccess, userControllers.detailsAccount)
  .get("/search", verifyAccess, userControllers.searchUsers)
  .put("/PIN", verifyAccess, userControllers.createPIN)
  .post("/PIN", verifyAccess, userControllers.confirmationPIN);

module.exports = router;
