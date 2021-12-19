require("dotenv").config();
const express = require("express");
const commonMiddle = require("./src/middleware/custMiddle");
const userRoutes = require("./src/routes/adminUsers");
const walletRoutes = require("./src/routes/adminWallet");
const transactionRoutes = require("./src/routes/adminTransaction");
const commonHelper = require("./src/helpers/notFoundHandle");
const errorHelper = require("./src/helpers/errorHandle");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const PORT = 3530;

// middleware
app.use(cors());
app.use(express.json());
app.use(commonMiddle.customMiddleware);
app.use(morgan("dev"));

// routes
app.use("/admin/users", userRoutes);
app.use("/admin/wallet", walletRoutes);
app.use("/admin/transaction", transactionRoutes);

// helpers
app.use(commonHelper.helperMessage);

// error handling
app.use(errorHelper.errorHandling);

// will use PORT 3530
app.listen(PORT, () => {
  console.log(`Server is running in PORT ${PORT}`);
});
