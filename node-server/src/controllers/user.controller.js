const { User } = require("../models");
const { ValidationError } = require("sequelize");

const addController = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, passConfirm } =
      req.body;

    if (password !== passConfirm) {
      return res.status(400).send({
        message: "Password are not the Same",
      });
    }
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password,
    };
    const user = await User.create(data);

    res
      .cookie("session", user.getRefreshToken(), {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
      })
      .setHeader("x-access-token", user.getAccessToken())
      .send({ "access-token": user.getAccessToken() });
  } catch (error) {
    res.status(error instanceof ValidationError ? 400 : 500).send({
      message:
        error.errors[0].message || error.message || "Some error occurred",
    });
  }
};

const getUserController = async (req, res) => {
  const localUser = res.locals.user;

  const user = await User.findOne({
    where: {
      id: localUser.id,
    },
  });

  const authUser = {
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    email: user.email,
  };

  res.send({ user: authUser });
};

module.exports = { addController, getUserController };
