const connection = require("../config/database");

// query to display all wallet
const displayWalletList = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM wallet", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// query to input wallet to database
const createWallet = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO wallet SET ?", data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// query to update info/value wallet
const updateWalletInfo = (data, id) => {
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

// query to delete selected wallet
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

// query to display detail info from selected wallet
const displaySelectedWallet = (id) => {
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

module.exports = {
  createWallet,
  displayWalletList,
  updateWalletInfo,
  deleteWallet,
  displaySelectedWallet,
};
