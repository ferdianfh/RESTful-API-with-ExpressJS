/* eslint-disable camelcase */
const transactionModel = require("../model/transaction");
const userModels = require("../model/users");
const standardResponse = require("../helper/responseHandle");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

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
    if (receiverPhone === null || receiverPhone === "") {
      return next({
        status: 403,
        message: "Receiver doesn't has phone number!"
      });
    }
    const [wallet] = await walletModel.searchWallet(email);
    const userId = wallet.user_id;
    const senderBalance = wallet.balance;
    const senderEmail = wallet.email;
    const transferDate = new Date();

    const [receiver] = await transactionModel.searchReceiver(receiverPhone);
    const receiverEmail = receiver.email;
    const receiverPicture = receiver.picture;

    if (email === receiverEmail) {
      return next({ status: 406, message: "Not Acceptable!" });
    } else if (senderBalance === 0) {
      return next({ status: 403, message: "Your Balance is empty" });
    } else if (senderBalance < 10000 || senderBalance < amountTransfer) {
      return next({
        status: 403,
        message: "I'm sorry, your Balance is not enough for transaction"
      });
    } else if (amountTransfer <= 0) {
      return next({
        status: 403,
        message: "Invalid input! Type the right amount of money!"
      });
    } else if (amountTransfer < 10000) {
      return next({ status: 403, message: "Minimum Transfer Rp10,000" });
    } else if (amountTransfer > 500000) {
      return next({ status: 403, message: "Maximum Transfer Rp500,000" });
    } else if (amountTransfer % 5000 !== 0) {
      return next({
        status: 403,
        message: "Nominal Transfer available: multiples of Rp5,000 or Rp10,000"
      });
    }

    const dataTransfer = {
      id: uuidv4(),
      user_id: userId,
      receiver_name: receiverName,
      receiver_phone: receiverPhone,
      receiver_picture: receiverPicture,
      amount_transfer: amountTransfer,
      notes: notes,
      date: transferDate
    };
    const transfer = await transactionModel.transfer(dataTransfer);
    standardResponse.responses(
      res,
      dataTransfer,
      200,
      `Transfer ${amountTransfer} from ${senderEmail} to ${receiverEmail} successfully recorded!`
    );
    console.log(transfer);
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const transferConfirmation = async (req, res, next) => {
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
    // console.log(account);
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
    const senderWalletId = wallet.id;
    const senderBalance = wallet.balance;
    const senderExpense = wallet.expense;
    const senderEmail = wallet.email;

    const [detailsTransfer] = await transactionModel.detailsTransferById(id);
    // console.log(detailsTransfer);
    const transferId = detailsTransfer.id;
    const receiverPhone = detailsTransfer.receiver_phone;
    const amountTransfer = detailsTransfer.amount_transfer;

    const [receiver] = await transactionModel.searchReceiver(receiverPhone);
    // console.log(receiver);
    const receiverWalletId = receiver.wallet_id;
    const receiverBalance = receiver.balance;
    const receiverIncome = receiver.income;
    const receiverEmail = receiver.email;

    const totalSenderBalance = parseInt(senderBalance - amountTransfer);
    const totalSenderExpense = parseInt(senderExpense + amountTransfer);

    const totalReceiverBalance = parseInt(receiverBalance + amountTransfer);
    const totalReceiverIncome = parseInt(receiverIncome + amountTransfer);

    const dataWalletSender = {
      balance: totalSenderBalance,
      expense: totalSenderExpense,
      updated_at: new Date()
    };
    const dataWalletReceiver = {
      balance: totalReceiverBalance,
      income: totalReceiverIncome,
      updated_at: new Date()
    };
    const dataTransfer = {
      status: "Success",
      updated_at: new Date()
    };
    // eslint-disable-next-line no-unused-vars
    const walletSender = await walletModel.updateWallet(
      dataWalletSender,
      senderWalletId
    );
    // eslint-disable-next-line no-unused-vars
    const walletReceiver = await walletModel.updateWallet(
      dataWalletReceiver,
      receiverWalletId
    );
    // eslint-disable-next-line no-unused-vars
    const updateTransfer = await transactionModel.updateTransferById(
      dataTransfer,
      transferId
    );
    standardResponse.responses(
      res,
      dataTransfer,
      200,
      `Transfer ${amountTransfer} from ${senderEmail} to ${receiverEmail} success!`
    );
  } catch (error) {
    console.log(error.message);
    console.log(error.stack);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const history = async (req, res, next) => {
  try {
    const userId = req.id;
    const sort = req.query.sort || "date";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * limit;
    const result = await transactionModel.history({
      userId,
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await transactionModel.calculateTransactionByUserId(
      userId
    );
    const { total } = calcResult[0];
    standardResponse.responses(
      res,
      result,
      200,
      `Data requests success! Total transactions from user with id: ${userId} are ${total}`,
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

const listTransaction = async (req, res, next) => {
  try {
    const sort = req.query.sort || "date";
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
  transferConfirmation,
  history,
  listTransaction
};
