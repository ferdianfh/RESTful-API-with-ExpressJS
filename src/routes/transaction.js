const express = require("express");
const transactionController = require("../controller/transaction");
const commonMiddle = require("../middleware/custMiddle");

const router = express.Router();

router
  .post("/", commonMiddle.isAdmin, transactionController.createTransaction)
  .get("/", commonMiddle.isAdmin, transactionController.listTransaction)
  .put("/:id", commonMiddle.isAdmin, transactionController.updateTransaction)
  .delete("/:id", commonMiddle.isAdmin, transactionController.deleteTransaction)
  .get(
    "/details/:id",
    commonMiddle.isAdmin,
    transactionController.detailsTransaction
  )
  .get("/", commonMiddle.isAdmin, transactionController.sortTransaction);

module.exports = router;
