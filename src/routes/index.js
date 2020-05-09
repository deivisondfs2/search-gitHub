const express = require("express");
const routes = express.Router();
const bodyParser = require("body-parser");
const userRouter = require("./user");
routes.use(bodyParser.json());

routes.use("/user", userRouter);

module.exports = routes;
