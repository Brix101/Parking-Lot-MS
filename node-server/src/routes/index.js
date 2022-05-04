const authRoutes = require("./auth.routes");
const parkingSpotRoutes = require("./parkingSpot.routes");
const userRoutes = require("./user.routes");

const routes = (app) => {
  app.get("/", (req, res) => {
    const socket = req.app.get("socket");

    res.send({ message: "☁☁☁" });
  });

  authRoutes(app);
  userRoutes(app);
  parkingSpotRoutes(app);
};

module.exports = routes;
