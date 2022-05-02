const { User } = require("../models");
const { ValidationError } = require("sequelize");
const argon2 = require("argon2");

const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: {
        userName: userName,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }

    const isMatch = await user.verifyPass(password);

    if (!isMatch) {
      return res.status(403).send({ message: "Password not Match" });
    }
    res.send({ token: user.getToken });
  } catch (error) {
    return res.status(error instanceof ValidationError ? 400 : 500).send({
      message:
        error instanceof ValidationError
          ? error.errors[0].message
          : error.message || "Some error occurred",
    });
  }
};

module.exports = { loginController };
