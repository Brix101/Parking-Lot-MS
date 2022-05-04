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
  },
});

const connections = new Set();
io.on("connection", (socket) => {
  app.set("socket", io);

  setInterval(() => {
    socket.emit("sample", { message: "Hello" });
  }, 1000);
  connections.add(socket);
  socket.once("disconnect", () => {
    connections.delete(socket);
  });
});

httpServer.listen(port, () => {
  console.log(`App running on port ${port}`);
});
