/* eslint-disable no-console */
const axiosInstance = require("../lib/axiosInstance");
const httpErrorsHandle = require("http-errors-handle");
module.exports = {
  async getUser(req, res) {
    const user_name = req.params.user_name;

    try {
      const resp = await httpErrorsHandle(
        axiosInstance.get(`/users/${user_name}`),
        "OPS!!! Custom MSG ERROR"
      );
      const { data } = resp;
      res.json(data);
    } catch (e) {
      console.log(e);
      const { message, status, statusCode } = e;
      res.status(status).json({ message, statusCode });
    }
  },
  async getUserRepositories(req, res) {
    const user_name = req.params.user_name;

    try {
      const resp = await httpErrorsHandle(
        axiosInstance.get(`/users/${user_name}/repos`),
        "OPS!!! Custom MSG ERROR"
      );
      const { data } = resp;
      res.json(data);
    } catch (e) {
      const { message, status, statusCode } = e;
      res.status(status).json({ message, statusCode });
    }
  },
};
