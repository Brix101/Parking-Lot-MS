const express = require("express");
const app = express();
const port = 5000;

const db = require("./utils/database");

const User = db.User;
const Op = db.Sequelize.Op;

app.get("/", (req, res) => {
  res.send({ message: "☁☁☁" });
});

app.get("/user", (req, res) => {
  // Create a Tutorial
  const user = {
    firstName: "Brix",
    lastName: "Porras",
    userName: "brix101",
    password: "password",
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
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
