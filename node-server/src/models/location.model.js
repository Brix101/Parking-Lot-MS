const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Location = sequelize.define("Locations", {
    location: {
      type: Sequelize.INTEGER,
      isInt: {
        msg: "Must be an integer number",
      },
    },
    availability: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    parker_id: {
      type: Sequelize.INTEGER,
      default: null,
    },
  });
  return Location;
};
