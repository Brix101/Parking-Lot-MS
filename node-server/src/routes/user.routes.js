const { addController } = require("../controllers/user.controller");

const userRoutes = (app) => {
  app.post("/api/user", addController);
};

module.exports = userRoutes;
