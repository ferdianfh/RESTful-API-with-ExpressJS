const responses = (res, result, status, message, pagination) => {
  res.status(status);
  res.json({
    status: "Success",
    code: status,
    data: result,
    message: message || null,
    pagination: pagination
  });
};

module.exports = { responses };
