/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
const walletModel = require("../model/wallet");
const standardResponse = require("../helper/responseHandle");
const topupModel = require("../model/topups");
const userModels = require("../model/users");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

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
    standardResponse.responses(
      res,
      result,
      200,
      `Data requests success! Total Wallets: ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalWallet: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const topUpMethod = async (req, res, next) => {
  try {
    const email = req.email;
    const topupMethod = req.body.topup_method;

    const [wallet] = await walletModel.searchWallet(email);
    const walletId = wallet.id;
    const userId = wallet.user_id;
    const topUpId = uuidv4();
    const topUpDate = new Date();

    const dataTopUp = {
      id: topUpId,
      user_id: userId,
      wallet_id: walletId,
      topup_method: topupMethod,
      date: topUpDate
    };

    const result = await topupModel.topUp(dataTopUp);
    standardResponse.responses(
      res,
      dataTopUp,
      200,
      `Top Up record successfully created by user: ${userId}. Top Up Method: ${topupMethod}`
    );
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const topUpInput = async (req, res, next) => {
  try {
    const email = req.email;
    const id = req.params.id;
    const amountTopUp = parseInt(req.body.amount_topup);

    const [topUpRecord] = await topupModel.getTopUpRecord(id);
    const topUpId = topUpRecord.id;
    const topUpDate = topUpRecord.date;

    if (amountTopUp <= 0) {
      return next({
        status: 403,
        message: "Invalid input! Type the right amount of money!"
      });
    } else if (amountTopUp < 10000) {
      return next({ status: 403, message: "Minimum Top Up Rp10,000" });
    } else if (amountTopUp > 200000) {
      return next({ status: 403, message: "Maximum Top Up Rp200,000" });
    } else if (amountTopUp % 5000 !== 0) {
      return next({
        status: 403,
        message: "Nominal Top Up available: multiples of Rp5,000 or Rp10,000"
      });
    }

    const dataTopUpInput = {
      amount_topup: amountTopUp,
      date: topUpDate
    };

    const result = await topupModel.updateTopUpRecord(dataTopUpInput, topUpId);

    standardResponse.responses(
      res,
      dataTopUpInput,
      200,
      `Top Up ${amountTopUp} successfully recorded!`
    );
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const topUpConfirmation = async (req, res, next) => {
  try {
    const email = req.email;
    const id = req.params.id;
    const { PIN } = req.body;

    const convertedPIN = PIN.toString();
    if (convertedPIN === "") {
      return next({ status: 403, message: "Please input your PIN!" });
    } else if (convertedPIN.length < 6) {
      return next({
        status: 403,
        message: "Please input 6 Digits of your PIN!"
      });
    }

    const [account] = await userModels.searchAccount(email);
    if (!account) {
      return next({ status: 403, message: "Your account is not registered!" });
    } else if (!account.PIN) {
      return next({
        status: 403,
        message: "You hasn't created a PIN. Please create PIN now!"
      });
    }

    const checkedPIN = await bcrypt.compare(convertedPIN, account.PIN);
    if (!checkedPIN) {
      return next({ status: 403, message: "Your PIN is wrong!" });
    }

    const [wallet] = await walletModel.searchWallet(email);
    const walletId = wallet.id;
    const balance = wallet.balance;
    const income = wallet.income;
    const updatedAt = new Date();

    const [topUpRecord] = await topupModel.getTopUpRecord(id);
    const topUpId = topUpRecord.id;
    const amountTopUp = topUpRecord.amount_topup;

    const totalBalance = parseInt(balance + amountTopUp);
    const totalIncome = parseInt(income + amountTopUp);

    const dataWallet = {
      balance: totalBalance,
      income: totalIncome,
      updated_at: updatedAt
    };
    const dataTopUpRecord = {
      status: "Success",
      updated_at: updatedAt
    };

    const walletAfterTopUp = await walletModel.updateWallet(
      dataWallet,
      walletId
    );
    const updateTopUpRecord = await topupModel.updateTopUpRecord(
      dataTopUpRecord,
      topUpId
    );

    standardResponse.responses(
      res,
      dataTopUpRecord,
      200,
      `Account with email: ${email} successfully Top Up!`
    );
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const topUpHistory = async (req, res, next) => {
  try {
    const userId = req.id;
    const sort = req.query.sort || "date";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;
    const result = await topupModel.topUpHistory({
      userId,
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await topupModel.calculateTopUpRecordsByUserId(userId);
    const { total } = calcResult[0];
    standardResponse.responses(
      res,
      result,
      200,
      `Data requests success! Total top up records from user with id: ${userId} are ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalTransaction: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const topUpList = async (req, res, next) => {
  try {
    const sort = req.query.sort || "date";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await topupModel.topUpList({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await topupModel.calculateTopUpRecords();
    const { total } = calcResult[0];
    standardResponse.responses(res, result, 200, "Data requests success!", {
      currentPage: page,
      limit: limit,
      totalTransaction: total,
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

  listWallets,

  topUpMethod,
  topUpInput,
  topUpConfirmation,
  topUpHistory,
  topUpList
};
