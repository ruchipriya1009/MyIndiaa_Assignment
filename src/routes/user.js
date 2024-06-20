const express = require("express");
const userRoute = express.Router();
const { validateUser, validateLogin } = require("../../middlewares/validation");
const { handleRegister, handleLogin } = require("../controllers/controller");

userRoute.post("/register", validateUser, handleRegister);

userRoute.post("/login", validateLogin, handleLogin);

module.exports = { userRoute };
