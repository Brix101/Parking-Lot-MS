const express = require("express");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const ip = require("./utils/ip");

const { deserializeUser } = require("./middlewares");
const { ParkingSpot } = require("./models");

const app = express();
const port = process.env.PORT || 5000;

const routes = require("./routes");
// TODO update cors to dynamic ip
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", `http://${ip.address()}:3000`],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "authorization"],
    exposedHeaders: ["Content-Type", "authorization"],
    credentials: true,
  })
);

app.use(deserializeUser);
routes(app);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000", `http://${ip.address()}:3000`],
    credentials: true,
  },
});

const connections = new Set();
app.set("socket", io);
io.on("connection", async (socket) => {
  // console.log("Connected  | " + socket.id);
  connections.add(socket);

  // ? Poll every 5 secs
  setInterval(async () => {
    const data = await ParkingSpot.findAll();
    socket.emit("allSpots", data);
  }, 5000);

  socket.on("disconnect", () => {
    connections.delete(socket);
    // console.log(`Disconnected | ${socket.id}`);
  });
});
httpServer.listen(port, () => {
  console.log(`App running on port ${port}`);
});
