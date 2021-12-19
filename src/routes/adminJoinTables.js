const express = require("express");
const joinTableControllers = require("../controllers/adminJoinTables");

const route = express.Router();

route.get("/wallet-user-transaction", joinTableControllers.displayJoinTables);

module.exports = route;
