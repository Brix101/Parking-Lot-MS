const {
  addController,
  getAllController,
  getOneController,
  updateController,
  deleteController,
} = require("../controllers/location.controller");

const locationRoutes = (app) => {
  app.get("/api/location", getAllController);
  app.post("/api/location", addController);
  app.get("/api/location/:id", getOneController);
  app.put("/api/location/:id", updateController);
  app.delete("/api/location/:id", deleteController);
};

module.exports = locationRoutes;
