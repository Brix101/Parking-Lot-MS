const {
  loginController,
  logoutController,
} = require("../controllers/auth.controller");
const { requiredUser } = require("../middlewares");

const userRoutes = (app) => {
  app.post("/api/login", loginController);
  app.get("/api/logout", requiredUser, logoutController);
};

module.exports = userRoutes;
