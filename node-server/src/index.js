const express = require("express");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { QueryTypes } = require("sequelize");

const { deserializeUser } = require("./middlewares");
const sequelize = require("./utils/database");
const { ParkingSpot } = require("./models");
const ip = require("./utils/ip");
const { generateSpot } = require("./utils/generateSpot");

const app = express();
const port = process.env.PORT || 5000;

const routes = require("./routes");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      `http://${ip.address()}:3000`,
      "http://192.168.1.36:3000",
    ],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "authorization"],
    exposedHeaders: ["Content-Type", "authorization"],
    credentials: true,
  })
);

app.use(deserializeUser);
routes(app);
generateSpot();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:3000",
      `http://${ip.address()}:3000`,
      "http://192.168.1.36:3000",
    ],
    credentials: true,
  },
});

const connections = new Set();
app.set("socket", io);
io.on("connection", async (socket) => {
  connections.add(socket);

  // ? Poll every 1 sec
  setInterval(async () => {
    const spots = await ParkingSpot.findAll();
    socket.emit("allSpots", spots);
  }, 1000);

  // ? Poll every 1 sec
  setInterval(async () => {
    const parkings = await sequelize.query(
      "SELECT Parkings.id AS ParkingId,Parkers.id AS ParkerID,Parkings.entered,Parkings.exited,Parkers.plateNumber,Parkers.note FROM Parkers INNER JOIN Parkings ON Parkings.parkerId = Parkers.id ORDER BY Parkings.entered DESC",
      {
        type: QueryTypes.RAW,
      }
    );
    socket.emit("allParkings", parkings);
  }, 2000);

  socket.on("disconnect", () => {
    connections.delete(socket);
  });
});

httpServer.listen(port, () => {
  console.log(`App running on port ${port}`);
});
