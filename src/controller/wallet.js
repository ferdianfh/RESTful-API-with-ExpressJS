/* eslint-disable camelcase */
const walletModel = require("../model/wallet");
const standardResponse = require("../helper/responseHandle");

const updateWallet = async (req, res, next) => {
  const id = req.params.id;
  const { PIN, topup, balance } = req.body;
  const data = {
    PIN: PIN,
    topup,
    balance: balance,
    updated_at: new Date()
  };
  try {
    const result = await walletModel.updateWallet(data, id);
    standardResponse.responses(
      res,
      result,
      200,
      "Data requests update success!"
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const deleteWallet = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await walletModel.deleteWallet(id);
    standardResponse.responses(
      res,
      result,
      200,
      "Data requests delete success!"
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const detailsWallet = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await walletModel.detailsWallet(id);
    const [detailResult] = result;
    console.log(result);
    standardResponse.responses(
      res,
      detailResult,
      200,
      "Data requests success!"
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

// API yang dipake mulai dari sini //

const topUp = async (req, res, next) => {
  const email = req.email;
  const topup = parseInt(req.body.amount_topup);
  const [wallet] = await walletModel.searchWallet(email);
  // console.log(wallet);
  // console.log(wallet.balance);
  const balanceAfter = parseInt(wallet.balance + topup);
  const userId = wallet.user_id;
  const data = {
    amount_topup: topup,
    balance: balanceAfter,
    updated_at: new Date()
  };
  try {
    const result = await walletModel.topUp(data, userId);
    console.log(result);
    standardResponse.responses(res, data, 200, `Top Up ${topup} success!`);
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const listWallets = async (req, res, next) => {
  try {
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await walletModel.listWallets({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await walletModel.calculateWallet();
    const { total } = calcResult[0];
    standardResponse.responses(res, result, 200, "Data requests success!", {
      currentPage: page,
      limit: limit,
      totalWallet: total,
      totalPage: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = {
  updateWallet,
  deleteWallet,
  detailsWallet,
  topUp,
  listWallets
};
