const authRoutes = require("./auth.routes");
const parkerRoutes = require("./parker.routes");
const parkingRoutes = require("./parking.routes");
const parkingSpotRoutes = require("./parkingSpot.routes");
const reportRoutes = require("./report.routes");
const userRoutes = require("./user.routes");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send({ message: "☁☁☁" });
  });

  authRoutes(app);
  userRoutes(app);
  parkerRoutes(app);
  parkingRoutes(app);
  reportRoutes(app);
  parkingSpotRoutes(app);
};

module.exports = routes;
