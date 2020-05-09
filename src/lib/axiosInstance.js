const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.github.com",
});

module.exports = axiosInstance;
