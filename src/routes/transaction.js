const express = require("express");
const transactionController = require("../controllers/transaction");

const router = express.Router();

router
  .post("/", transactionController.createTransaction)
  .get("/", transactionController.displayTransactionList)
  .put("/:id", transactionController.updateTransactionInfo)
  .delete("/:id", transactionController.deleteTransaction)
  .get("/details/:id", transactionController.displaySelectedTransaction)
  .get("/", transactionController.sortTransaction);

module.exports = router;
