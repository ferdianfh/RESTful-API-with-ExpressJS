const customMiddleware = (req, res, next) => {
  console.log("ini adalah custom middleware");
  next();
};

const isAdmin = (req, res, next) => {
  const auth = req.headers.auth;
  if (auth === "admin") {
    return next();
  }
  next({ status: 403, message: "Forbidden Access!" });
};

module.exports = {
  customMiddleware,
  isAdmin
};
