const authRoutes = require("./auth.routes");
const locationRoutes = require("./location.routes");
const userRoutes = require("./user.routes");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send({ message: "☁☁☁" });
  });
  authRoutes(app);
  userRoutes(app);
  locationRoutes(app);
};

module.exports = routes;
