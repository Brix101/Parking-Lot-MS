const { ValidationError } = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequilize = require("../utils/database");

const getAllController = async (req, res) => {
  try {
    data = await sequilize.query(
      "SELECT Parkings.id AS ParkingId,Parkers.id AS ParkerID,Parkings.entered,Parkings.exited,Parkers.plateNumber,Parkers.note FROM Parkers INNER JOIN Parkings ON Parkings.parkerId = Parkers.id ORDER BY Parkings.entered DESC",
      {
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
};
