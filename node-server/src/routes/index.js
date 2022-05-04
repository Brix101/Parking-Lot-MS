const authRoutes = require("./auth.routes");
const parkingSpotRoutes = require("./parkingSpot.routes");
const userRoutes = require("./user.routes");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send({ message: "☁☁☁" });
  });
  authRoutes(app);
  userRoutes(app);
  parkingSpotRoutes(app);
};

module.exports = routes;
