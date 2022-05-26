const {
  addController,
  getUserController,
} = require("../controllers/user.controller");

const { requiredUser } = require("../middlewares");

const userRoutes = (app) => {
  app.post("/api/user", requiredUser, addController);
  app.get("/api/user", requiredUser, getUserController);
};

module.exports = userRoutes;
