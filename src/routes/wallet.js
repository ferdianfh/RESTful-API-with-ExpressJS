const express = require("express");
const walletControllers = require("../controllers/wallet");

const router = express.Router();

router
  .post("/", walletControllers.createWallet)
  .get("/", walletControllers.displayWalletList)
  .put("/:id", walletControllers.updateWalletInfo)
  .delete("/:id", walletControllers.deleteWallet)
  .get("/details/:id", walletControllers.displaySelectedWallet);

module.exports = router;
