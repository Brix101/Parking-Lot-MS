const Sequelize = require("sequelize");

const argon2 = require("argon2");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "Users",
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
      email: {
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
  return User;
};
