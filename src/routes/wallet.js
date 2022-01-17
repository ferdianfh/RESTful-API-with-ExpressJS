const express = require("express");
const walletController = require("../controller/wallet");
const commonMiddle = require("../middleware/custMiddle");

const router = express.Router();

router
  .get("/", commonMiddle.isAdmin, walletController.listWallets)
  .put("/:id", walletController.updateWallet)
  .delete("/:id", commonMiddle.isAdmin, walletController.deleteWallet)
  .get("/details/:id", commonMiddle.isAdmin, walletController.detailsWallet)
  .put("/create-pin/:id", walletController.createPIN)
  .put("/topup/:id", walletController.topUp);

module.exports = router;
