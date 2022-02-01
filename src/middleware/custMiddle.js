const customMiddleware = (req, res, next) => {
  console.log("ini adalah custom middleware");
  next();
};

module.exports = {
  customMiddleware
};
