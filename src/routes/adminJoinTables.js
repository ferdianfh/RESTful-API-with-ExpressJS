const express = require("express");
const joinTableControllers = require("../controller/adminJoinTables");

const route = express.Router();

route.get("/wallet-user", joinTableControllers.displayJoinTables);

module.exports = route;
