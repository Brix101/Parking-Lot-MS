const { loginController } = require("../controllers/auth.controller");

const userRoutes = (app) => {
  app.post("/api/login", loginController);
};

module.exports = userRoutes;
