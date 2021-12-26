const transactionModel = require("../models/transaction");
const standardResponse = require("../helpers/responseHandle");

const createTransaction = async (req, res, next) => {
  const { id_wallet_sender, id_wallet_receiver, amount_transfer, notes } =
    req.body;
  const data = {
    id_wallet_sender: id_wallet_sender,
    id_wallet_receiver: id_wallet_receiver,
    amount_transfer: amount_transfer,
    notes: notes
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
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const listTransaction = async (req, res, next) => {
  try {
    const result = await transactionModel.listTransaction();
    standardResponse.responses(res, result, 200, "Data requests success!");
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const updateTransaction = async (req, res, next) => {
  const id = req.params.id;
  const { id_wallet_sender, id_wallet_receiver, amount_transfer, notes } =
    req.body;
  const data = {
    id_wallet_sender: id_wallet_sender,
    id_wallet_receiver: id_wallet_receiver,
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

module.exports = {
  createTransaction,
  listTransaction,
  updateTransaction,
  deleteTransaction,
  detailsTransaction,
  sortTransaction
};
