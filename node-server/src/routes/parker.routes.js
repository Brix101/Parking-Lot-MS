const {
  getAllController,
  getAllByPlateController,
} = require("../controllers/parker.controller");
const { requiredUser } = require("../middlewares");
const parkingRoutes = (app) => {
  app.get("/api/parker", getAllController);
  app.get("/api/parker/:plateNumber", getAllByPlateController);
};
module.exports = parkingRoutes;
