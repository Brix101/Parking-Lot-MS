const { DataTypes } = require("sequelize");
const argon2 = require("argon2");

const sequelize = require("../utils/database");

const { signJwt } = require("../utils/jwt.utils");

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
User.prototype.verifyPass = async function (password) {
  return await argon2.verify(this.password, password);
};

User.prototype.getRefreshToken = function () {
  return signJwt(
    { id: this.id, userName: this.userName },
    {
      expiresIn: 86400, //xp 24hours
    }
  );
};

User.prototype.getAccessToken = function () {
  return signJwt(
    { ...this, id: this.id },
    {
      expiresIn: 900, //xp 15min
    }
  );
};

module.exports = User;
