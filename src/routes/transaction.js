const express = require("express");
const transactionController = require("../controller/transaction");
const { isAdmin } = require("../middleware/auth");

const router = express.Router();

router
  .post("/", isAdmin, transactionController.createTransaction)
  .get("/", isAdmin, transactionController.listTransaction)
  .put("/:id", isAdmin, transactionController.updateTransaction)
  .delete("/:id", isAdmin, transactionController.deleteTransaction)
  .get("/details/:id", isAdmin, transactionController.detailsTransaction)
  .get("/", isAdmin, transactionController.sortTransaction);

module.exports = router;
