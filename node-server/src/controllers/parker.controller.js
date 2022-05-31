const { ValidationError } = require("sequelize");
const { QueryTypes } = require("sequelize");
const sequilize = require("../utils/database");

const getAllController = async (req, res) => {
  try {
    const plateNumber = req.query.plateNumber;
    const condition = plateNumber
      ? `WHERE Parkers.plateNumber LIKE '%${plateNumber}%'`
      : "";
    data = await sequilize.query(
      `SELECT Parkers.id AS ParkerId,Parkers.plateNumber,Parkings.entered,Parkings.exited FROM Parkers INNER JOIN Parkings ON Parkings.parkerId = Parkers.id ${condition} GROUP BY Parkers.id ORDER BY Parkings.entered DESC`,
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
    data = await sequilize.query(
      "SELECT Parkers.id, Parkers.plateNumber, ParkerImages.imageLink, Parkings.entered, Parkings.exited FROM `Parkers` INNER JOIN ParkerImages ON Parkers.id = ParkerImages.parkerId INNER JOIN Parkings ON Parkings.id = Parkings.parkerId WHERE Parkers.plateNumber = :plateNumber",
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

    data.map((plateData) => {
      plate.id = plateData.id;
      plate.plateNumber = plateData.plateNumber;
      plate.images.push(plateData.imageLink);
      plate.history.push({
        entered: plateData.entered,
        exited: plateData.exited,
      });
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
