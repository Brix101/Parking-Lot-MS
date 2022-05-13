const {
  getAllController,
  getByPlateController,
  updateController,
} = require("../controllers/parker.controller");
const { requiredUser } = require("../middlewares");
const parkingRoutes = (app) => {
  app.get("/api/parker", getAllController);
  app.get("/api/parker/:plateNumber", getByPlateController);
  app.put("/api/parker/:id", updateController);
};
module.exports = parkingRoutes;
