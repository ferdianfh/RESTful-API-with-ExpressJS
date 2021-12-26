const joinTablesModels = require("../model/adminJoinTables");
const standardResponse = require("../helper/responseHandle");

const displayJoinTables = async (req, res, next) => {
  try {
    const result = await joinTablesModels.displayJoinTables();
    standardResponse.responses(res, result, 200, "Join tables success!");
  } catch (error) {
    console.log(error.message);
    next({ status: 500, message: "Internal Server Error!" });
  }
};

module.exports = { displayJoinTables };