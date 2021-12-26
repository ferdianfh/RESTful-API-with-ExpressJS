const connection = require("../config/database");

// query to join tables wallet, users, transaction
const displayJoinTables = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT wallet.id_user, users.email, transaction.id_wallet_sender, transaction.id_wallet_receiver, amount_transfer, transaction.notes, transaction.date FROM wallet JOIN users ON (wallet.id_user = users.id) JOIN transaction ON (transaction.id_wallet_sender = wallet.id)",
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
