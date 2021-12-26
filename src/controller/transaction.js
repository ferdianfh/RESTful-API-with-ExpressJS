/* eslint-disable camelcase */
const transactionModel = require("../model/transaction");
const standardResponse = require("../helper/responseHandle");

const createTransaction = async (req, res, next) => {
  const { wallet_ID, phone_receiver, amount_transfer, notes } = req.body;
  const data = {
    wallet_ID: wallet_ID,
    phone_receiver: phone_receiver,
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
    const sort = req.query.sort || "created_at";
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

module.exports = {
  createTransaction,
  listTransaction,
  updateTransaction,
  deleteTransaction,
  detailsTransaction,
  sortTransaction
};
