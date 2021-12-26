const express = require("express");
const transactionController = require("../controller/transaction");

const router = express.Router();

router
  .post("/", transactionController.createTransaction)
  .get("/", transactionController.listTransaction)
  .put("/:id", transactionController.updateTransaction)
  .delete("/:id", transactionController.deleteTransaction)
  .get("/details/:id", transactionController.detailsTransaction)
  .get("/", transactionController.sortTransaction);

module.exports = router;
