const express = require("express");
const walletController = require("../controller/wallet");
const { isAdmin, verifyAccess } = require("../middleware/auth");
// const { clearProfileInRedis } = require("../middleware/redis");

const router = express.Router();

router
  .get("/", verifyAccess, isAdmin, walletController.listWallets)
  .get("/details/:id", verifyAccess, isAdmin, walletController.detailsWallet)
  .post("/topup/method", verifyAccess, walletController.topUpMethod)
  .put("/topup/:id", verifyAccess, walletController.topUpInput)
  .post(
    "/topup/confirmation/:id",
    verifyAccess,
    walletController.topUpConfirmation
  )
  .get("/topup/history", verifyAccess, walletController.topUpHistory)
  .get("/topup/list", verifyAccess, walletController.topUpList);

module.exports = router;
