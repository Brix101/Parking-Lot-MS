const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Location = sequelize.define("ParkingSpots", {
  spotCode: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field cannot be empty",
      },
    },
  },
  isAvailable: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Location;
