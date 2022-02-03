const express = require("express");
const walletController = require("../controller/wallet");
const { isAdmin, verifyAccess } = require("../middleware/auth");
const { clearProfileInRedis } = require("../middleware/redis");

const router = express.Router();

router
  .get("/", verifyAccess, isAdmin, walletController.listWallets)
  .get("/details/:id", verifyAccess, isAdmin, walletController.detailsWallet)
  .put("/topup", verifyAccess, clearProfileInRedis, walletController.topUp);

module.exports = router;
