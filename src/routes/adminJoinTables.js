const express = require("express");
const joinTableControllers = require("../controller/adminJoinTables");

const route = express.Router();

route.get("/wallet-user-transaction", joinTableControllers.displayJoinTables);

module.exports = route;
