const errorHandling = (err, req, res, next) => {
  const statusCode = err.status;
  const message = err.message;
  res.status("500");
  res.json({
    status: statusCode,
    message: message
  });
};

module.exports = { errorHandling };
