/* eslint-disable camelcase */
const userModel = require("../model/users");
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
    const result = await userModel.listAccounts();
    standardResponse.responses(res, result, 200, "Data requests success!");
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

module.exports = {
  createAccount,
  listAccounts,
  updateAccount,
  deleteAccount,
  detailsAccount,
  searchUsers
};
