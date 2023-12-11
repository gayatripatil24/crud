import express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser());

// Require the route file
const routes = require(".//routes/router");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(express.static("public"));
// Using the route file as middleware
app.use("/", routes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `Server is running at http://localhost:${process.env.SERVER_PORT}`
  );
});
