const transactionModels = require("../models/transaction");
const standardResponse = require("../helpers/responseHandle");

// it will display all transaction from database
const displayTransactionList = async (req, res, next) => {
  try {
    const result = await transactionModels.displayTransactionList();
    standardResponse.responses(res, result, 200, "Data requests success!");
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

// it will input transaction to database
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
    const result = await transactionModels.createTransaction(data);
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

// it will update specific transaction info/value
const updateTransactionInfo = async (req, res, next) => {
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
    const result = await transactionModels.updateTransactionInfo(data, id);
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

// it will delete selected transaction
const deleteTransaction = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await transactionModels.deleteTransaction(id);
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

// it will display detail info from selected transaction
const displaySelectedTransaction = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await transactionModels.displaySelectedTransaction(id);
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

// it will sort transaction by date
const sortTransaction = async (req, res, next) => {
  try {
    const sort = req.query.sort;
    const order = req.query.order;

    const result = await transactionModels.sortTransaction({
      sort: sort,
      order: order
    });
    standardResponse.responses(res, result, 200, "Data requests success!");
  } catch (error) {
    // it will show error from internal such as bad query or typo
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = {
  createTransaction: createTransaction,
  displayTransactionList: displayTransactionList,
  updateTransactionInfo: updateTransactionInfo,
  deleteTransaction: deleteTransaction,
  displaySelectedTransaction: displaySelectedTransaction,
  sortTransaction: sortTransaction
};
