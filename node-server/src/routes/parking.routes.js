const { getAllController } = require("../controllers/parking.controller");
const { requiredUser } = require("../middlewares");
const parkingRoutes = (app) => {
  app.get("/api/parking", getAllController);
};
module.exports = parkingRoutes;
