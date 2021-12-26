const express = require("express");
const walletController = require("../controller/wallet");

const router = express.Router();

router
  .post("/", walletController.createWallet)
  .get("/", walletController.listWallets)
  .put("/:id", walletController.updateWallet)
  .delete("/:id", walletController.deleteWallet)
  .get("/details/:id", walletController.detailsWallet);

module.exports = router;
