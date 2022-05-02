const { DataTypes } = require("sequelize");
const argon2 = require("argon2");
const { sign } = require("jsonwebtoken");
const sequelize = require("../utils/database");

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
    getterMethods: {
      getToken() {
        return sign({ ...this, id: this.id }, "Secret", {
          expiresIn: 86400, //xp 24 hours
        });
      },
    },
  }
);
User.prototype.verifyPass = async function (password) {
  return await argon2.verify(this.password, password);
};

module.exports = User;
