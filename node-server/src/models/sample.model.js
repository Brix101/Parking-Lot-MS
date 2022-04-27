module.exports = (sequelize, Sequelize) => {
  const Sample = sequelize.define("Sample", {
    name: {
      type: Sequelize.STRING,
    },
  });
  return Sample;
};
