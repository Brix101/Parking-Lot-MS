const { adduser } = require("../controllers/user.controller");

const userRoutes = (app) => {
  app.get("/api/user", adduser);
};

module.exports = userRoutes;
