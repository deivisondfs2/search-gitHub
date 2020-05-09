/**
 * Module dependencies.
 */

const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const config = require("./lib/config");
const helmet = require("helmet");

module.exports = (() => {
  const app = express();

  // all environments
  app.set("port", config.get("PORT"));
  app.use("/healthcheck", (req, res) => {
    res.send("OK");
  });

  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(methodOverride());
  app.use(helmet());

  return app;
})();
