const helperMessage = (req, res, next) => {
  const statusCode = 404;
  res.status(statusCode);
  res.json({
    status: "Success",
    code: statusCode,
    data: null,
    message: "URL Not Found"
  });
};

module.exports = { helperMessage };
