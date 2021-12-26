const connection = require("../config/database");

// query to display all transaction
const displayTransactionList = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM transaction", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// query to input user to database
const createTransaction = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO transaction SET ?", data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// query to update info/value transaction
const updateTransactionInfo = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE transaction SET ? WHERE id = ?",
      [data, id],
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

// query to delete selected user
const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM transaction WHERE id = ?",
      id,
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

// query to display detail info from selected user
const displaySelectedTransaction = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM transaction WHERE id = ?",
      id,
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

// query to display user by name
const sortTransaction = ({ sort, order }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_wallet_sender, id_wallet_receiver, amount_transfer, notes, date FROM transaction ORDER BY ?? ${order}`,
      sort,
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

module.exports = {
  createTransaction,
  displayTransactionList,
  updateTransactionInfo,
  deleteTransaction,
  displaySelectedTransaction,
  sortTransaction,
};
