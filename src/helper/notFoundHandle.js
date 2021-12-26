const helperMessage = (req, res, next) => {
  res.status("404");
  res.json({ message: "URL Not Found" });
};

module.exports = { helperMessage };
