const { ValidationError } = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequilize = require("../utils/database");

const getAllController = async (req, res) => {
  try {
    const plateNumber = req.query.plateNumber;
    const condition = plateNumber
      ? `WHERE Parkers.plateNumber LIKE '%${plateNumber}%'`
      : "";
    const data = await sequilize.query(
      `SELECT Parkers.plateNumber, Parkings.entered, Parkings.exited FROM Parkings INNER JOIN Parkers ON Parkers.id = Parkings.parkerId ORDER BY Parkings.entered DESC ${condition}`,
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

const getByPlateController = async (req, res) => {
  try {
    const plateNumber = req.params.plateNumber;
    const plateData = await sequilize.query(
      "SELECT Parkers.plateNumber, Parkings.entered, Parkings.exited FROM Parkings INNER JOIN Parkers ON Parkers.id = Parkings.parkerId WHERE Parkers.plateNumber = :plateNumber ORDER BY Parkings.entered DESC",
      {
        replacements: { plateNumber: plateNumber },
        type: QueryTypes.SELECT,
      }
    );

    const imageData = await sequilize.query(
      "SELECT ParkerImages.imageLink FROM Parkers INNER JOIN ParkerImages ON ParkerImages.parkerId = Parkers.id WHERE Parkers.plateNumber = :plateNumber",
      {
        replacements: { plateNumber: plateNumber },
        type: QueryTypes.SELECT,
      }
    );

    const plate = {
      id: null,
      plateNumber: null,
      images: [],
      history: [],
    };

    plateData.map((data) => {
      plate.id = data.id;
      plate.plateNumber = data.plateNumber;
      plate.history.push({
        entered: data.entered,
        exited: data.exited,
      });
    });

    imageData.map((data) => {
      plate.images.push(data);
    });

    res.send(plate);
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
    const { note } = req.body;

    const num = await sequilize.query(
      "UPDATE `Parkers` SET `note`=:note WHERE `id`= :id",
      {
        replacements: { id: id, note: note },
        type: QueryTypes.UPDATE,
      }
    );
    if (num[0] !== 1) {
      return res.status(404).send({
        message: `Parker Not Found`,
      });
    }
    res.send({
      message: "Updated successfully!",
    });
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
  updateController,
};
