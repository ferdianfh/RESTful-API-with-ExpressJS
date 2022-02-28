const express = require("express");
const transactionController = require("../controller/transaction");
const { isAdmin, verifyAccess } = require("../middleware/auth");
// const { clearProfileInRedis } = require("../middleware/redis");

const router = express.Router();

router
  .get("/", verifyAccess, isAdmin, transactionController.listTransaction)
  .get("/history", verifyAccess, transactionController.history)
  .post("/transfer", verifyAccess, transactionController.transfer)
  .post(
    "/transfer/:id",
    verifyAccess,
    transactionController.transferConfirmation
  );

module.exports = router;
