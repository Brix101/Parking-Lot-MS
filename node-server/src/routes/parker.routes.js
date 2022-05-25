const {
  getAllController,
  getByPlateController,
  updateController,
} = require("../controllers/parker.controller");
const { requiredUser } = require("../middlewares");

// Todo set required user on routes
const parkingRoutes = (app) => {
  app.get("/api/parker", getAllController);
  app.get("/api/parker/:plateNumber", getByPlateController);
  app.put("/api/parker/:id", updateController);
};
module.exports = parkingRoutes;
