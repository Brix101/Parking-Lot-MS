const argon2 = require("argon2");

module.exports = (sequelize, Sequelize) => {
  const Sample = sequelize.define(
    "User",
    {
      firstName: {
        type: Sequelize.STRING,
      },
      lastName: {
        type: Sequelize.STRING,
      },
      userName: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
    },
    {
      hooks: {
        beforeCreate: async (record, options) => {
          const password = record.dataValues.password;
          record.dataValues.password = await argon2.hash(password);
        },
      },
    }
  );
  return Sample;
};
