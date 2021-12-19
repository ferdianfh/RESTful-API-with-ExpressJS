const responses = (res, result, status, message) => {
  res.status("200");
  res.json({
    status: "Success",
    code: status,
    data: result,
    message: message || null,
  });
};

module.exports = { responses };
