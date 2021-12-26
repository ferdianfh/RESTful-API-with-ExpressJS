const connection = require("../config/database");

// query to display all users
const displayUsersList = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM users", (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    });
  });
};

// query to input user to database
const createUser = (data) => {
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

// query to update info/value users
const updateUserInfo = (data, id) => {
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

// query to delete selected user
const deleteUser = (id) => {
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

// query to display detail info from selected user
const displaySelectedUser = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM users WHERE id = ?",
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

module.exports = {
  createUser,
  displayUsersList,
  updateUserInfo,
  deleteUser,
  displaySelectedUser,
  searchUsers,
};
