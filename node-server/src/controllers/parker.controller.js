const { ValidationError } = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequilize = require("../utils/database");

const getAllController = async (req, res) => {
  try {
    data = await sequilize.query("SELECT id, plateNumber, note FROM Parkers", {
      type: QueryTypes.SELECT,
    });

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

const getByPlateController = async (req, res) => {
  try {
    const plateNumber = req.params.plateNumber;
    data = await sequilize.query(
      "SELECT ParkerImages.id, Parkers.plateNumber, ParkerImages.imageLink FROM `Parkers` INNER JOIN ParkerImages ON Parkers.id = ParkerImages.parkerId WHERE Parkers.plateNumber = :plateNumber",
      {
        replacements: { plateNumber: plateNumber },
        type: QueryTypes.SELECT,
      }
    );

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

module.exports = {
  getAllController,
  getByPlateController,
};
