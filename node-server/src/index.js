const express = require("express");
const app = express();
const port = 5000;

const db = require("./utils/database");

const Sample = db.Sample;
const Op = db.Sequelize.Op;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/sample", (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  Sample.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Names.",
      });
    });
});

app.get("/post", (req, res) => {
  // Create a Tutorial
  const sample = {
    name: "sample",
  };
  // Save Tutorial in the database
  Sample.create(sample)
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
