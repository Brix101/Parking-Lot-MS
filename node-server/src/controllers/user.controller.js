const { User } = require("../models");
const { ValidationError, Op } = require("sequelize");

const addController = async (req, res) => {
  try {
    const socket = req.app.get("socket");
    const {
      firstName,
      lastName,
      userName,
      email,
      password,
      passConfirm,
      isAdmin,
    } = req.body;

    if (password !== passConfirm) {
      return res.status(400).send({
        message: "Please Input Same Password",
      });
    }
    const data = {
      firstName,
      lastName,
      userName,
      email,
      password,
      isAdmin,
    };
    const user = await User.create(data);
    socket.emit("addedUser", user);
    res.send({ message: `${firstName} ${lastName} Successfully Added!!!` });
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
    const user = [];

    data.forEach((userData) => {
      user.push({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userName: userData.userName,
        email: userData.email,
        isAdmin: userData.isAdmin,
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

const updateUserController = async (req, res) => {
  const socket = req.app.get("socket");
  try {
    const id = req.params.id;
    const num = await User.update(req.body, {
      where: { id: id },
    });

    if (num[0] !== 1) {
      return res.status(404).send({
        message: `User Not Found`,
      });
    }

    const data = await User.findAll();
    const user = [];

    data.forEach((userData) => {
      user.push({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userName: userData.userName,
        email: userData.email,
        isAdmin: userData.isAdmin,
      });
    });

    socket.emit("allUser", user);

    res.send({
      message: "Updated successfully!",
    });
  } catch (error) {
    return res.status(error instanceof ValidationError ? 400 : 500).send({
      message:
        error instanceof ValidationError
          ? error.errors[0].message
          : error.message || "Some error occurred",
    });
  }
};

const deleteUserController = async (req, res) => {
  const socket = req.app.get("socket");
  try {
    const id = req.params.id;
    const num = await User.destroy({
      where: { id: id },
    });

    if (num !== 1) {
      return res.status(404).send({
        message: `User Not Found`,
      });
    }
    const data = await User.findAll();
    const user = [];

    data.forEach((userData) => {
      user.push({
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        userName: userData.userName,
        email: userData.email,
        isAdmin: userData.isAdmin,
      });
    });

    socket.emit("allUser", user);

    res.send({
      message: "Deleted successfully!",
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message || "Some error occurred",
    });
  }
};
module.exports = {
  addController,
  getUserController,
  getAllUserController,
  updateUserController,
  deleteUserController,
};
