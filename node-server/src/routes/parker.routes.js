const {
  getAllController,
  getByPlateController,
} = require("../controllers/parker.controller");
const { requiredUser } = require("../middlewares");
const parkingRoutes = (app) => {
  app.get("/api/parker", getAllController);
  app.get("/api/parker/:plateNumber", getByPlateController);
};
module.exports = parkingRoutes;
