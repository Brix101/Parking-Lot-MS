const { ParkingSpot } = require("../models");
const { ValidationError } = require("sequelize");

const addController = async (req, res) => {
  const socket = req.app.get("socket");
  try {
    const { spotCode } = req.body;
    if (!spotCode) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    data = await ParkingSpot.create({ spotCode });
    socket.emit("addedSpot", data);
    res.send(data);
  } catch (error) {
    return res.status(error instanceof ValidationError ? 400 : 500).send({
      message:
        error instanceof ValidationError
          ? error.errors[0].message
          : error.message || "Some error occurred",
    });
  }
};
const getAllController = async (req, res) => {
  try {
    const spotCode = req.query.spotCode;
    var condition = spotCode
      ? { spotCode: { [Op.like]: `%${spotCode}%` } }
      : null;
    data = await ParkingSpot.findAll({ where: condition });

    res.send(data);
  } catch (error) {
    return res.status(error instanceof ValidationError ? 400 : 500).send({
      message:
        error instanceof ValidationError
          ? error.errors[0].message
          : error.message || "Some error occurred",
    });
  }
};
const updateController = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await ParkingSpot.update(req.body, {
      where: { id: id },
    });
    if (num[0] !== 1) {
      return res.status(404).send({
        message: `spotCode Not Found`,
      });
    }
    res.send({
      message: "Updated successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occured",
    });
  }
};
const deleteController = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await ParkingSpot.destroy({
      where: { id: id },
    });

    if (num !== 1) {
      return res.status(404).send({
        message: `spotCode Not Found`,
      });
    }

    res.send({
      message: "Deleted successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred",
    });
  }
};

module.exports = {
  addController,
  getAllController,
  updateController,
  deleteController,
};
