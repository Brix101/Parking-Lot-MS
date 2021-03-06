const {
  addController,
  getUserController,
  getAllUserController,
  updateUserController,
  deleteUserController,
} = require("../controllers/user.controller");

const { requiredUser } = require("../middlewares");

const userRoutes = (app) => {
  app.post("/api/user", requiredUser, addController);
  app.get("/api/whoami", requiredUser, getUserController);
  app.get("/api/users", requiredUser, getAllUserController);
  app.put("/api/user/:id", requiredUser, updateUserController);
  app.delete("/api/user/:id", requiredUser, deleteUserController);
};

module.exports = userRoutes;
