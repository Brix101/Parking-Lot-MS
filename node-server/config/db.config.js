module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "root",
  DB: "parking-lot-ms",
  dialect: "mysql",
  OP: 0,
  logging: 0, //? Disables logging
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  SECRET_KEY: "SEEeeeEEEeeEEEeeecret",
};
