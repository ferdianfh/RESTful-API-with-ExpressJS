/* eslint-disable camelcase */
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../model/users");
const walletModel = require("../model/wallet");
const standardResponse = require("../helper/responseHandle");

const createAccount = async (req, res, next) => {
  const { username, email, password, first_name, last_name, phone } = req.body;
  const data = {
    username: username,
    email: email,
    password: password,
    first_name: first_name,
    last_name: last_name,
    phone: phone
  };
  try {
    const result = await userModel.createAccount(data);
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

const listAccounts = async (req, res, next) => {
  try {
    const sort = req.query.sort || "created_at";
    const order = req.query.order || "desc";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const offset = (page - 1) * limit;
    const result = await userModel.listAccounts({ sort, order, limit, offset });
    const calcResult = await userModel.calculateAccount();
    const { total } = calcResult[0];
    standardResponse.responses(res, result, 200, "Data requests success!", {
      currentPage: page,
      limit: limit,
      totalAccount: total,
      totalPage: Math.ceil(total / limit)
    });
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const updateAccount = async (req, res, next) => {
  const id = req.params.id;
  const { username, email, first_name, last_name, phone } = req.body;
  const data = {
    username: username,
    email: email,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    updated_at: new Date()
  };
  try {
    const result = await userModel.updateAccount(data, id);
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

const deleteAccount = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await userModel.deleteAccount(id);
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

const detailsAccount = async (req, res, next) => {
  const id = req.params.id;
  try {
    const result = await userModel.detailsAccount(id);
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

const searchUsers = async (req, res, next) => {
  try {
    const search = req.query.username;
    const sort = req.query.sort;
    const order = req.query.order;

    const result = await userModel.searchUsers({
      search: search,
      sort: sort,
      order: order
    });
    standardResponse.responses(res, result, 200, "Data requests success!");
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const userId = uuidv4();
    const user = await userModel.searchAccount(email);
    if (user.length > 0) {
      return next({ status: 403, message: "This account is already exist!" });
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const account = {
      id: userId,
      username,
      email,
      password: hashPassword
    };
    const wallet = {
      id: uuidv4(),
      user_ID: userId
    };
    const result = await userModel.createNewAccount(account);
    const createWallet = await walletModel.createWallet(wallet);
    console.log(result);
    console.log(createWallet);
    standardResponse.responses(res, account, 200, "Registration Success!");
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [account] = await userModel.searchAccount(email);
    if (!account) {
      return next({
        status: 403,
        message: "Wrong email or password. Please check again!"
      });
    }
    const checkPassword = await bcrypt.compare(password, account.password);
    if (checkPassword) {
      standardResponse.responses(res, null, 200, "Login success!");
    } else {
      return next({
        status: 403,
        message: "Wrong email or password. Please check again!"
      });
    }
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = {
  createAccount,
  listAccounts,
  updateAccount,
  deleteAccount,
  detailsAccount,
  searchUsers,
  signUp,
  login
};
