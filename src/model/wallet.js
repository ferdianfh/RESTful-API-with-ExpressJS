const connection = require("../config/database");

const createWallet = (wallet) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO wallet SET ?", wallet, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const listWallets = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM wallet ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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

const updateWallet = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE wallet SET ? WHERE id = ?",
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

const deleteWallet = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM wallet WHERE id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const detailsWallet = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM wallet WHERE id = ?",
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

const calculateWallet = () => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM wallet",
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

const searchWallet = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM wallet WHERE user_ID = ?",
      userId,
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

const topUp = (data, userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE wallet SET ? WHERE user_ID = ?",
      [data, userId],
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
  createWallet,
  listWallets,
  updateWallet,
  deleteWallet,
  detailsWallet,
  calculateWallet,
  searchWallet,
  topUp
};
