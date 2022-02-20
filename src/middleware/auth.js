const jwt = require("jsonwebtoken");

const verifyAccess = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    // console.log(token);
  } else {
    return next({
      status: 401,
      message: "Unauthorized account! Please login to verify your identity."
    });
  }

  try {
    const privateKey = process.env.SECRET_KEY_JWT;
    const decoded = jwt.verify(token, privateKey);
    // console.log("hasil decoded: ", decoded);
    req.id = decoded.id;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error) {
    // console.log("error dari verify: ", error.message);
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({
        status: 400,
        message: "Token Expired! Please login again."
      });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

const verifyEmail = (req, res, next) => {
  const token = req.params.token;

  try {
    const privateKey = process.env.SECRET_KEY_JWT;
    const decoded = jwt.verify(token, privateKey);
    // console.log("hasil decoded: ", decoded);
    // req.name = decoded.name;
    req.email = decoded.email;
    req.role = decoded.role;
    next();
  } catch (error) {
    // console.log("error dari verify: ", error.message);
    if (error && error.name === "JsonWebTokenError") {
      return next({ status: 400, message: "Invalid Token!" });
    } else if (error && error.name === "TokenExpiredError") {
      return next({
        status: 400,
        message: "Token Expired! Please login again."
      });
    } else {
      return next({ status: 400, message: "Token Inactive!" });
    }
  }
};

const isAdmin = (req, res, next) => {
  const role = req.role;
  if (role !== "admin") {
    return next({
      status: 403,
      message: "Forbidden Access! You don't have right to do this action."
    });
  }
  next();
};

module.exports = { verifyAccess, verifyEmail, isAdmin };
