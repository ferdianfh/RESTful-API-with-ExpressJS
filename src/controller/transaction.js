/* eslint-disable camelcase */
const transactionModel = require("../model/transaction");
const standardResponse = require("../helper/responseHandle");
const { v4: uuidv4 } = require("uuid");

const walletModel = require("../model/wallet");

const createTransaction = async (req, res, next) => {
  const { wallet_ID, phone_receiver, amount_transfer, notes } = req.body;
  const data = {
    id: uuidv4(),
    wallet_ID: wallet_ID,
    phone_receiver: phone_receiver,
    amount_transfer: amount_transfer,
    notes: notes,
    date: new Date()
  };
  try {
    const result = await transactionModel.createTransaction(data);
    standardResponse.responses(
      res,
      result,
      200,
      "Data requests input success!"
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: error.message });
  }
};

const updateTransaction = async (req, res, next) => {
  const id = req.params.id;
  const { wallet_ID, phone_receiver, amount_transfer, notes } = req.body;
  const data = {
    wallet_ID: wallet_ID,
    phone_receiver: phone_receiver,
    amount_transfer: amount_transfer,
    notes: notes,
    updated_at: new Date()
  };
  try {
    const result = await transactionModel.updateTransaction(data, id);
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

const deleteTransaction = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await transactionModel.deleteTransaction(id);
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

const detailsTransaction = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await transactionModel.detailsTransaction(id);
    const [detailResult] = result;
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

const sortTransaction = async (req, res, next) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;
    const result = await transactionModel.sortTransaction({
      sort: sort,
      order: order
    });
    standardResponse.responses(res, result, 200, "Data requests success!");
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

// API baru mulai dari sini //

const transfer = async (req, res, next) => {
  try {
    const email = req.email;
    const amountTransfer = parseInt(req.body.amountTransfer);
    const { receiverName, receiverPhone, notes } = req.body;

    const [wallet] = await walletModel.searchWallet(email);
    const senderWalletId = wallet.id;
    const userId = wallet.user_id;
    const senderBalance = wallet.balance;
    const senderEmail = wallet.email;
    const transferDate = new Date();

    const [receiver] = await transactionModel.searchReceiver(receiverPhone);
    const receiverWalletId = receiver.wallet_id;
    const receiverBalance = receiver.balance;
    const receiverEmail = receiver.email;

    // console.log(wallet);
    // console.log(receiverPhone);
    // console.log(receiver);

    const senderBalanceAfterTransfer = parseInt(senderBalance - amountTransfer);
    const receiverBalanceAfterTransfer = parseInt(
      receiverBalance + amountTransfer
    );

    const dataTransfer = {
      id: uuidv4(),
      user_id: userId,
      receiver_name: receiverName,
      receiver_phone: receiverPhone,
      amount_transfer: amountTransfer,
      notes: notes,
      date: transferDate
    };
    const dataWalletSender = {
      balance: senderBalanceAfterTransfer,
      updated_at: transferDate
    };
    const dataWalletReceiver = {
      balance: receiverBalanceAfterTransfer,
      updated_at: transferDate
    };
    const transfer = await transactionModel.transfer(dataTransfer);
    const walletSender = await walletModel.updateWallet(
      dataWalletSender,
      senderWalletId
    );
    const walletReceiver = await walletModel.updateWallet(
      dataWalletReceiver,
      receiverWalletId
    );

    standardResponse.responses(
      res,
      dataTransfer,
      200,
      `Transfer ${amountTransfer} from ${senderEmail} to ${receiverEmail} success!`
    );

    console.log(transfer);
    console.log(walletSender);
    console.log(walletReceiver);
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const listTransaction = async (req, res, next) => {
  try {
    const sort = req.query.sort || "receiver_phone";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await transactionModel.listTransaction({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await transactionModel.calculateTransaction();
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
  createTransaction,
  updateTransaction,
  deleteTransaction,
  detailsTransaction,
  sortTransaction,

  transfer,
  listTransaction
};
