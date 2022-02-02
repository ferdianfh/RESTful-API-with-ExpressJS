const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userModels = require("../model/users");
const walletModels = require("../model/wallet");
const standardResponse = require("../helper/responseHandle");
const verification = require("../helper/emailVerification");

const signUp = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, PIN } = req.body;
    const userId = uuidv4();
    const user = await userModels.searchAccount(email);
    if (user.length > 0) {
      return next({ status: 403, message: "This account is already exist!" });
    }
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);
    const account = {
      id: userId,
      first_name: firstName,
      last_name: lastName,
      email,
      password: hashPassword,
      PIN
    };
    const signUpData = {
      id: account.id,
      name: account.name,
      email: account.email
    };
    const wallet = {
      id: uuidv4(),
      user_id: userId
    };
    const result = await userModels.createNewAccount(account);
    const createWallet = await walletModels.createWallet(wallet);

    const privateKey = process.env.SECRET_KEY_JWT;
    const payload = signUpData;
    const verifyOption = { expiresIn: "1 hours" };
    const token = jwt.sign(payload, privateKey, verifyOption);
    signUpData.token = token;
    console.log(token);

    verification.sendEmail(email, token);

    console.log(result);
    console.log(createWallet);
    standardResponse.responses(
      res,
      signUpData,
      201,
      `Registration Success! New account with email: ${account.email} has been created.`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const [account] = await userModels.searchAccount(email);
    if (!account) {
      return next({
        status: 403,
        message: "Please check your email or password!"
      });
    }
    const loginData = {
      id: account.id,
      name: account.name,
      email: account.email,
      role: account.role
    };
    const checkPassword = await bcrypt.compare(password, account.password);
    if (!checkPassword) {
      return next({
        status: 403,
        message: "Please check your email or password!"
      });
    }
    const privateKey = process.env.SECRET_KEY_JWT;
    const payload = loginData;
    const verifyOption = { expiresIn: "2 hours" };
    const token = jwt.sign(payload, privateKey, verifyOption);
    loginData.token = token;
    standardResponse.responses(
      res,
      loginData,
      200,
      `Account with email: ${account.email} successfully login!`
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
    const result = await userModels.listAccounts({
      sort,
      order,
      limit,
      offset
    });
    const calcResult = await userModels.calculateAccount();
    const { total } = calcResult[0];
    standardResponse.responses(
      res,
      result,
      200,
      `Data requests success! Total accounts: ${total}`,
      {
        currentPage: page,
        limit: limit,
        totalAccount: total,
        totalPage: Math.ceil(total / limit)
      }
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const profile = async (req, res, next) => {
  try {
    const email = req.email;
    const [account] = await userModels.detailsAccount(email);
    const profileData = {
      id: account.id,
      first_name: account.first_name,
      last_name: account.last_name,
      email: account.email,
      phone: account.phone,
      picture: account.picture,
      balance: account.balance,
      created_at: account.created_at,
      updated_at: account.updated_at
    };
    standardResponse.responses(
      res,
      profileData,
      200,
      `Profile with email: ${email} successfully requested!`
    );
    // console.log(account);
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const addProfilePicture = async (req, res, next) => {
  try {
    const email = req.email;
    const picture = req.file.filename;
    const updatedAt = new Date();
    const data = {
      picture: `${process.env.BASE_URL}/file/${picture}`,
      updated_at: updatedAt
    };
    const result = await userModels.updateAccount(data, email);
    standardResponse.responses(
      res,
      data,
      200,
      `Profile picture with email: ${email} successfully updated!`
    );
    // console.log(req.email);
    // console.log(req.file);
    console.log(result);
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const addPhoneNumber = async (req, res, next) => {
  try {
    const email = req.email;
    const dataProfile = req.body;
    const updatedAt = new Date();
    const data = {
      phone: dataProfile.phone,
      updated_at: updatedAt
    };
    const result = await userModels.updateAccount(data, email);
    console.log(result);
    standardResponse.responses(
      res,
      data,
      200,
      `Profile phone with email: ${email} successfully updated!`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await userModels.deleteAccount(userId);
    console.info(result);
    standardResponse.responses(
      res,
      null,
      200,
      `Account with id: ${userId} has been deleted.`
    );
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const verifyAccount = async (req, res, next) => {
  try {
    const email = req.email;
    const updatedAt = new Date();
    const data = {
      verified: "verified",
      updated_at: updatedAt
    };
    const result = await userModels.updateAccount(data, email);
    standardResponse.responses(
      res,
      data,
      200,
      `Account with email: ${email} successfully verified!`
    );
    console.log(result);
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

const searchUsers = async (req, res, next) => {
  try {
    const search = req.query.name;
    const sort = req.query.sort;
    const order = req.query.order;

    const result = await userModels.searchUsers({
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
  signUp,
  login,
  profile,
  addProfilePicture,
  addPhoneNumber,
  listAccounts,
  deleteAccount,
  verifyAccount,
  searchUsers
};
