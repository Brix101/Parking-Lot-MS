const express = require("express");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const { deserializeUser } = require("./middlewares");

const app = express();
const port = process.env.PORT || 5000;

const routes = require("./routes");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(deserializeUser);
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

routes(app);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

const connections = new Set();
app.set("socket", io);
io.on("connection", async (socket) => {
  // console.log("Connected  | " + socket.id);
  connections.add(socket);
  socket.on("disconnect", () => {
    connections.delete(socket);
    // console.log(`Disconnected | ${socket.id}`);
  });
});

httpServer.listen(port, () => {
  console.log(`App running on port ${port}`);
});
