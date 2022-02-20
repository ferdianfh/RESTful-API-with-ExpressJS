const responses = (res, result, status, message, pagination) => {
  const statusMessage = () => {
    if (status === 200) {
      return "Success";
    } else {
      return "Failed";
    }
  };
  res.status(status);
  res.json({
    status: statusMessage(),
    code: status,
    data: result,
    message: message || null,
    pagination: pagination
  });
};

module.exports = { responses };
