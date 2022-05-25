const { getAllController } = require("../controllers/parking.controller");
const { requiredUser } = require("../middlewares");

// Todo set required user on routes
const parkingRoutes = (app) => {
  app.get("/api/parking", getAllController);
};
module.exports = parkingRoutes;
