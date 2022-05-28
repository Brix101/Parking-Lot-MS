const {
  addController,
  getUserController,
  getAllUserController,
} = require("../controllers/user.controller");

const { requiredUser } = require("../middlewares");

const userRoutes = (app) => {
  app.post("/api/user", requiredUser, addController);
  app.get("/api/whoami", requiredUser, getUserController);
  app.get("/api/users", getAllUserController);
};

module.exports = userRoutes;
