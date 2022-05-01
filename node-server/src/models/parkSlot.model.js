const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  const Sample = sequelize.define("Locations", {
    location: {
      type: Sequelize.INTEGER,
    },
    availability: {
      type: Sequelize.BOOLEAN,
      default: true,
    },
    plateNumber: {
      type: Sequelize.STRING,
      default: null,
    },
  });
  return Sample;
};
