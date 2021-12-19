const walletModels = require("../models/adminWallet");
const standardResponse = require("../helpers/responseHandle");

// it will display all wallet from database
const displayWalletList = async (req, res, next) => {
  try {
    const result = await walletModels.displayWalletList();
    standardResponse.responses(res, result, 200, "Data requests success!");
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

// it will input wallet to database
const createWallet = async (req, res, next) => {
  const { id_user, balance } = req.body;
  const data = {
    id_user: id_user,
    balance: balance,
  };

  try {
    const result = await walletModels.createWallet(data);
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

// it will update specific wallet info/value
const updateWalletInfo = async (req, res, next) => {
  const id = req.params.id;
  const { id_user, balance } = req.body;
  const data = {
    id_user: id_user,
    balance: balance,
    updated_at: new Date(),
  };

  try {
    const result = await walletModels.updateWalletInfo(data, id);
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

// it will delete selected wallet
const deleteWallet = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await walletModels.deleteWallet(id);
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

// it will display detail info from selected wallet
const displaySelectedWallet = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await walletModels.displaySelectedWallet(id);
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
  createWallet: createWallet,
  displayWalletList: displayWalletList,
  updateWalletInfo: updateWalletInfo,
  deleteWallet: deleteWallet,
  displaySelectedWallet: displaySelectedWallet,
};
