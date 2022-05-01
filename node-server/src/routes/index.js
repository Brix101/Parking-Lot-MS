const userRoutes = require("./user.routes");

const routes = (app) => {
  app.get("/", (req, res) => {
    res.send({ message: "☁☁☁" });
  });

  userRoutes(app);
};

module.exports = routes;
