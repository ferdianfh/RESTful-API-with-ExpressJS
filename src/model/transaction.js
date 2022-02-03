const connection = require("../config/database");

const createTransaction = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO transactions SET ?",
      data,
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

const updateTransaction = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE transactions SET ? WHERE id = ?",
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

const deleteTransaction = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM transactions WHERE id = ?",
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

const detailsTransaction = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM transactions WHERE id = ?",
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

const sortTransaction = ({ sort, order }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id_wallet_sender, id_wallet_receiver, amount_transfer, notes, date FROM transactions ORDER BY ?? ${order}`,
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

const calculateTransaction = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM transactions",
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

// API baru mulai dari sini //

const searchReceiver = (receiverPhone) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT users.id, users.email, users.phone, wallets.id as wallet_id, wallets.balance FROM users INNER JOIN wallets ON users.id = wallets.user_id WHERE users.phone = ?",
      [receiverPhone],
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

const transfer = (data) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO transactions SET ?",
      data,
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

const listTransaction = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT users.id, users.email, users.phone, wallets.balance, transactions.id, transactions.receiver_phone, transactions.amount_transfer, transactions.date FROM transactions INNER JOIN users ON transactions.user_id = users.id INNER JOIN wallets ON wallets.user_id = users.id ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
      [sort, limit, offset],
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
  updateTransaction,
  deleteTransaction,
  detailsTransaction,
  sortTransaction,
  calculateTransaction,

  searchReceiver,
  listTransaction,
  transfer
};
