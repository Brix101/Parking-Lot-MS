const {
  getAllController,
  getByPlateController,
  updateController,
} = require("../controllers/parker.controller");
const { requiredUser } = require("../middlewares");

// Todo set required user on routes
const parkingRoutes = (app) => {
  app.get("/api/parker", requiredUser, getAllController);
  app.get("/api/plate/:plateNumber", getByPlateController);
  app.put("/api/parker/:id", requiredUser, updateController);
};
module.exports = parkingRoutes;
