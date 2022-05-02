const { addController } = require("../controllers/user.controller");

const { requiredUser } = require("../middlewares");

const userRoutes = (app) => {
  app.post("/api/user", requiredUser, addController);
};

module.exports = userRoutes;
