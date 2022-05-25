const { User } = require("../models");
const { ValidationError, Op } = require("sequelize");

const loginController = async (req, res) => {
  try {
    const { identity, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [
          {
            email: identity,
          },
          {
            userName: identity,
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

    const authUser = {
      firstName: user.firstName,
      lastName: user.lastName,
      userName: user.userName,
      email: user.email,
    };

    res
      .cookie("refreshToken", user.getRefreshToken(), {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      })
      .send({ user: authUser, token: user.getAccessToken() });
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
  const user = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
  };
  res.clearCookie("refreshToken").send({ user: user });
};
module.exports = { loginController, logoutController };
