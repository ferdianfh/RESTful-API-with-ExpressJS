const express = require("express");
const walletControllers = require("../controllers/wallet");

const route = express.Router();

route
  .post("/create", walletControllers.createWallet)
  .get("/list", walletControllers.displayWalletList)
  .put("/update/:id", walletControllers.updateWalletInfo)
  .delete("/remove/:id", walletControllers.deleteWallet)
  .get("/details/:id", walletControllers.displaySelectedWallet);

module.exports = route;
