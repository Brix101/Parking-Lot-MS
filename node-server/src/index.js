const express = require("express");
const cookieParser = require("cookie-parser");
const { deserializeUser, requiredUser } = require("./middlewares");
const app = express();
const port = process.env.PORT || 5000;

const routes = require("./routes");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(deserializeUser);
app.use(requiredUser);

routes(app);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
