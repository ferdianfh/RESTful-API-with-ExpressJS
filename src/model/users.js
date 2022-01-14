const connection = require("../config/database");

const createAccount = (data) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO users SET ?", data, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const listAccounts = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT users.id, users.email, users.phone, users.first_name, users.last_name, users.created_at, users.updated_at FROM users ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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

const updateAccount = (data, id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET ? WHERE id = ?",
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

const deleteAccount = (id) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM users WHERE id = ?", id, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};
// this is fo fetching so many data in Frontend
const detailsAccount = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT users.id, users.first_name, users.last_name, users.email, users.phone, wallet.id as wallet_id, wallet.user_ID, wallet.balance FROM users INNER JOIN wallet ON users.id = wallet.user_ID WHERE users.id = ?",
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

const searchUsers = ({ search, sort, order }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, username, email, phone FROM users WHERE username LIKE ? ORDER BY ?? ${order}`,
      [search, sort],
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

const calculateAccount = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT(*) AS total FROM users", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const searchAccount = (email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE email = ?",
      email,
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

const createNewAccount = (account) => {
  return new Promise((resolve, reject) => {
    connection.query("INSERT INTO users SET ?", account, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

const updateProfile = (profile, email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET ? WHERE email = ?",
      [profile, email],
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
  createAccount,
  listAccounts,
  updateAccount,
  deleteAccount,
  detailsAccount,
  searchUsers,
  calculateAccount,
  searchAccount,
  createNewAccount,
  updateProfile
};
