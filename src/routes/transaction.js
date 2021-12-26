const express = require("express");
const transactionController = require("../controllers/transaction");

const route = express.Router();

route
  .post("/create", transactionController.createTransaction)
  .get("/list", transactionController.displayTransactionList)
  .put("/update/:id", transactionController.updateTransactionInfo)
  .delete("/remove/:id", transactionController.deleteTransaction)
  .get("/details/:id", transactionController.displaySelectedTransaction)
  .get("/sort", transactionController.sortTransaction);

module.exports = route;
