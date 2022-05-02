const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Location = sequelize.define("Locations", {
    location: {
      type: DataTypes.INTEGER,
      isInt: {
        msg: "Must be an integer number",
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
  return Location;
};
