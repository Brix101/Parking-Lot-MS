const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Location = sequelize.define("Locations", {
    location: {
      type: Sequelize.INTEGER,
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
