/**
 * Configuration provider
 * @module lib/config
 */

const nconf = require("nconf");
const path = require("path");

/* eslint no-process-env: off */
const env = process.env.NODE_ENV || "development";

nconf.env({ parseValues: true });
nconf.file(path.join(__dirname, `../appSettings.${env}.json`));
nconf.defaults({
  "Logging:Level": "info",
  cache_ttl: 3600,
});

const config = {};

/**
 * Get configuration value.
 * @param {string} key Key of the configuration value to get.
 * @return {string} The configuration value.
 */
config.get = (key) => nconf.get(key);

Object.defineProperties(config, {
  env: { writable: false },
});

module.exports = config;
