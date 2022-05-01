const db = require("../utils/database");
const User = db.User;

const adduser = (req, res) => {
  // Create a Tutorial
  const user = {
    firstName: "Brix",
    lastName: "Porras",
    userName: "brix101",
    password: "password",
    email: "brixterporras@gmail.com",
  };
  // Save Tutorial in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sample.",
      });
    });
};

module.exports = { adduser };
