/* eslint-disable no-undef */
"use strict";

process.env.http_proxy = "";
process.env.https_proxy = "";

process.env.axios_url = "https://api.github.com";

describe("API", () => {
  require("./functional_tests/users/user_api.js");
});
