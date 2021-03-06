require("dotenv").config();
const express = require("express");
// const morgan = require("morgan");
const cors = require("cors");
const userRoutes = require("./src/routes/users");
const walletRoutes = require("./src/routes/wallet");
const transactionRoutes = require("./src/routes/transaction");
// const commonMiddle = require("./src/middleware/custMiddle");
const commonHelper = require("./src/helper/notFoundHandle");
const errorHelper = require("./src/helper/errorHandle");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(commonMiddle.customMiddleware);
// app.use(morgan("dev"));

// routes
app.use("/users", userRoutes);
app.use("/wallet", walletRoutes);
app.use("/transaction", transactionRoutes);
app.use("/file", express.static("./uploads"));

// helpers
app.use(commonHelper.helperMessage);

// error handling
app.use(errorHelper.errorHandling);

// will use PORT 3300
app.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`);
});

module.exports = app;
