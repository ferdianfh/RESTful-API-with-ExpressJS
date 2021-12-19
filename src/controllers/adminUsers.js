const userModels = require("../models/adminUsers");
const standardResponse = require("../helpers/responseHandle");

// it will display all users from database
const displayUsersList = async (req, res, next) => {
  try {
    const result = await userModels.displayUsersList();
    standardResponse.responses(res, result, 200, "Data requests success!");
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

// it will input user to database
const inputUser = async (req, res, next) => {
  const { username, email, first_name, last_name, phone } = req.body;
  const data = {
    username: username,
    email: email,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
  };

  try {
    const result = await userModels.inputUser(data);
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

// it will update specific user info/value
const updateUserInfo = async (req, res, next) => {
  const id = req.params.id;
  const { username, email, first_name, last_name, phone } = req.body;
  const data = {
    username: username,
    email: email,
    first_name: first_name,
    last_name: last_name,
    phone: phone,
    updated_at: new Date(),
  };

  try {
    const result = await userModels.updateUserInfo(data, id);
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

// it will delete selected user
const deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await userModels.deleteUser(id);
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

// it will display detail info from selected user
const displaySelectedUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await userModels.displaySelectedUser(id);
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

// it will search users by name
const searchUsers = async (req, res, next) => {
  try {
    const search = req.query.username;
    const sort = req.query.sort;
    const order = req.query.order;

    const result = await userModels.searchUsers({
      search: search,
      sort: sort,
      order: order,
    });
    standardResponse.responses(res, result, 200, "Data requests success!");
  } catch (error) {
    // it will show error from internal such as bad query or typo
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = {
  inputUser: inputUser,
  displayUserslist: displayUsersList,
  updateUserInfo: updateUserInfo,
  deleteUser: deleteUser,
  displaySelectedUser: displaySelectedUser,
  searchUsers: searchUsers,
};
