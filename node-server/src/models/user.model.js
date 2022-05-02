const { DataTypes } = require("sequelize");

const argon2 = require("argon2");

module.exports = (sequelize) => {
  const User = sequelize.define(
    "Users",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "The field cannot be empty",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        notEmpty: {
          args: true,
          msg: "The field cannot be empty",
        },
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Username Taken",
        },
        validate: {
          notEmpty: {
            msg: "The field cannot be empty",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
        validate: {
          isEmail: {
            msg: "Enter Valid Email",
          },
          notEmpty: {
            msg: "The field cannot be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "The field cannot be empty",
          },
        },
      },
    },
    {
      hooks: {
        beforeSave: async (record, _) => {
          const password = record.dataValues.password;
          record.dataValues.password = await argon2.hash(password);
        },
      },
    }
  );
  return User;
};
