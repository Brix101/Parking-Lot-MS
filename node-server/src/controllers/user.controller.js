const { User } = require("../models");
const { ValidationError, Op } = require("sequelize");

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
    isAdmin: user.isAdmin,
  };

  res.send({ user: authUser });
};

const getAllUserController = async (req, res) => {
  try {
    const name = req.query.name;
    var condition = name
      ? {
          [Op.or]: [
            {
              firstName: { [Op.like]: `${name}%` },
            },
            {
              lastName: { [Op.like]: `${name}%` },
            },
          ],
        }
      : null;
    const data = await User.findAll({ where: condition });
    console.log(condition);
    const user = [];

    data.forEach((userDate) => {
      user.push({
        firstName: userDate.firstName,
        lastName: userDate.lastName,
        userName: userDate.userName,
        email: userDate.email,
        isAdmin: userDate.isAdmin,
      });
    });

    res.send(user);
  } catch (error) {
    return res.status(error instanceof ValidationError ? 400 : 500).send({
      message:
        error instanceof ValidationError
          ? error.errors[0].message
          : error.message || "Some error occurred",
    });
  }
};
module.exports = { addController, getUserController, getAllUserController };
