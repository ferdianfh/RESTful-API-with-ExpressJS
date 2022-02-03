const express = require("express");
const transactionController = require("../controller/transaction");
const { isAdmin, verifyAccess } = require("../middleware/auth");

const router = express.Router();

router
  .get("/", verifyAccess, isAdmin, transactionController.listTransaction)
  .post("/transfer", verifyAccess, transactionController.transfer);

module.exports = router;
