const walletModel = require("../models/wallet");
const standardResponse = require("../helpers/responseHandle");

const createWallet = async (req, res, next) => {
  const { id_user, balance } = req.body;
  const data = {
    id_user: id_user,
    balance: balance
  };
  try {
    const result = await walletModel.createWallet(data);
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

const listWallets = async (req, res, next) => {
  try {
    const result = await walletModel.listWallets();
    standardResponse.responses(res, result, 200, "Data requests success!");
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const updateWallet = async (req, res, next) => {
  const id = req.params.id;
  const { id_user, balance } = req.body;
  const data = {
    id_user: id_user,
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

module.exports = {
  createWallet,
  listWallets,
  updateWallet,
  deleteWallet,
  detailsWallet
};
