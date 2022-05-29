const {
  addController,
  getUserController,
  getAllUserController,
} = require("../controllers/user.controller");

const { requiredUser } = require("../middlewares");

const userRoutes = (app) => {
  app.post("/api/user", requiredUser, addController);
  app.get("/api/whoami", requiredUser, getUserController);
  app.get("/api/users", requiredUser, getAllUserController);
};

module.exports = userRoutes;
