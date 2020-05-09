/**
 * Logging provider
 * @module lib/logger
 */

"use strict";

const winston = require("winston");
const config = require("./config");

winston.default.transports.console.prettyPrint = true;
winston.level = config.get("Logging:Level");

module.exports = winston;
