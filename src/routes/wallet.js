const express = require("express");
const walletController = require("../controller/wallet");
const { isAdmin, verifyAccess } = require("../middleware/auth");

const router = express.Router();

router
  .get("/", verifyAccess, isAdmin, walletController.listWallets)
  .put("/:id", walletController.updateWallet)
  .delete("/:id", isAdmin, walletController.deleteWallet)
  .get("/details/:id", isAdmin, walletController.detailsWallet)
  .put("/topup/:id", walletController.topUp);

module.exports = router;
