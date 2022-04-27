module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "parking-lot-ms",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
