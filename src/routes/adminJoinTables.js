const express = require("express");
const joinTableControllers = require("../controllers/adminJoinTables");

const route = express.Router();

route.get("/join", joinTableControllers.displayJoinTables);

module.exports = route;
