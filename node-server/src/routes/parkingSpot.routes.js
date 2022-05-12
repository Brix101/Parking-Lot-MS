const {
  addController,
  getAllController,
  getOneController,
  updateController,
  deleteController,
} = require("../controllers/parkingSpot.controller");

const { requiredUser } = require("../middlewares");

const parkingSpotRoutes = (app) => {
  app.get("/api/parking-spot", getAllController);
  app.post("/api/parking-spot", requiredUser, addController);
  app.get("/api/parking-spot/:id", requiredUser, getOneController);
  app.put("/api/parking-spot/:id", updateController);
  app.delete("/api/parking-spot/:id", requiredUser, deleteController);
};

module.exports = parkingSpotRoutes;
