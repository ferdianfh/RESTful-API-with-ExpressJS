const connection = require("../config/database");

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

const listAccounts = ({ sort, order, limit, offset }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT users.id, users.name, users.email, users.picture, users.role, users.verified, users.created_at, users.updated_at FROM users ORDER BY ?? ${order} LIMIT ? OFFSET ?`,
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

const updateAccount = (data, email) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE users SET ? WHERE email = ?",
      [data, email],
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

const searchUsers = ({ search, sort, order }) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT id, first_name, last_name, email, phone, created_at, updated_at FROM users WHERE first_name LIKE '%${search}%' ORDER BY ?? ${order}`,
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
  searchAccount,
  createNewAccount,
  listAccounts,
  calculateAccount,
  updateAccount,
  deleteAccount,
  searchUsers
};
