const express = require("express");
const cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { deserializeUser } = require("./middlewares");
const app = express();
const port = process.env.PORT || 5000;

const routes = require("./routes");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(deserializeUser);

routes(app);

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});
io.on("connection", (socket) => {
  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
});

httpServer.listen(port, () => {
  console.log(`App running on port ${port}`);
});
