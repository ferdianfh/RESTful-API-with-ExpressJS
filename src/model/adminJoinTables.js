const connection = require("../config/database");

// query to join tables wallet, users, transaction
const displayJoinTables = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT users.id, users.email, users.phone, wallet.id, wallet.PIN, wallet.balance FROM wallet JOIN users ON (user.id = wallet.user_ID)",
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};

module.exports = { displayJoinTables };
