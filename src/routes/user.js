const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/user_controller");

userRouter.get("/info/:user_name", userController.getUser);

userRouter.get("/info/:user_name/repo", userController.getUserRepositories);

module.exports = userRouter;
