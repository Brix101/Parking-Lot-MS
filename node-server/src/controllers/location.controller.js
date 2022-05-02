const { Location } = require("../models");
const { ValidationError } = require("sequelize");

const addController = async (req, res) => {
  try {
    const { location } = req.body;
    if (!location) {
      return res.status(400).send({
        message: "Content can not be empty!",
      });
    }

    data = await Location.create({ location });
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
    const location = req.query.location;
    var condition = location
      ? { location: { [Op.like]: `%${location}%` } }
      : null;
    data = await Location.findAll({ where: condition });

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

const getOneController = async (req, res) => {
  try {
    const id = req.params.id;

    const location = await Location.findByPk(id);

    if (!location) {
      return res.status(404).send({
        message: `Location Not Found`,
      });
    }

    res.send(location);
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred",
    });
  }
};
const updateController = async (req, res) => {
  try {
    const id = req.params.id;
    const num = await Location.update(req.body, {
      where: { id: id },
    });

    if (num !== 1) {
      return res.status(404).send({
        message: `Location Not Found`,
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
    const num = await Location.destroy({
      where: { id: id },
    });

    if (num !== 1) {
      return res.status(404).send({
        message: `Location Not Found`,
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
  getOneController,
  updateController,
  deleteController,
};
