const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

routes(app);

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
