const { generateController } = require("../controllers/report.controller");
const { requiredUser } = require("../middlewares");
const reportRoutes = (app) => {
  app.get("/api/report", generateController);
};

module.exports = reportRoutes;
