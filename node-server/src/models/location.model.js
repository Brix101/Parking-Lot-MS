const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database");

const Location = sequelize.define("Locations", {
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "The field cannot be empty",
      },
    },
  },
  availability: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  parker_id: {
    type: DataTypes.INTEGER,
    default: null,
  },
});

module.exports = Location;
