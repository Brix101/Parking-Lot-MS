const { User } = require("../models");
const { ValidationError, Op } = require("sequelize");

const loginController = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: userName,
          },
          {
            userName: userName,
          },
        ],
      },
    });

    if (!user) {
      return res.status(404).send({ message: "User Not Found" });
    }

    const isMatch = await user.verifyPass(password);

    if (!isMatch) {
      return res.status(403).send({ message: "Password not Match" });
    }
    res
      .cookie("refreshToken", user.getRefreshToken(), {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      })
      .send({ token: user.getAccessToken() });
  } catch (error) {
    return res.status(error instanceof ValidationError ? 400 : 500).send({
      message:
        error instanceof ValidationError
          ? error.errors[0].message
          : error.message || "Some error occurred",
    });
  }
};

const logoutController = async (req, res) => {
  res.clearCookie("refreshToken").send();
};
module.exports = { loginController, logoutController };
