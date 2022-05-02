const {
  addController,
  getAllController,
  getOneController,
  updateController,
  deleteController,
} = require("../controllers/location.controller");

const { requiredUser } = require("../middlewares");

const locationRoutes = (app) => {
  app.get("/api/location", getAllController);
  app.post("/api/location", requiredUser, addController);
  app.get("/api/location/:id", requiredUser, getOneController);
  app.put("/api/location/:id", requiredUser, updateController);
  app.delete("/api/location/:id", requiredUser, deleteController);
};

module.exports = locationRoutes;
