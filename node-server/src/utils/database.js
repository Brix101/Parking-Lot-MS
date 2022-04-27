const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: false, //? Disables logging
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize.sync();
// sequelize.sync({force: true});
// sequelize.sync({ alter: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Sample = require("../models/sample.model")(sequelize, Sequelize);
db.User = require("../models/user.model")(sequelize, Sequelize);
module.exports = db;
