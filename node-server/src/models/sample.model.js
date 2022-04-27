module.exports = (sequelize, Sequelize) => {
  const Sample = sequelize.define(
    "Sample",
    {
      name: {
        type: Sequelize.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: (record, options) => {
          record.dataValues.name = record.dataValues.name + "qwerty222";
        },
      },
    }
  );
  return Sample;
};
