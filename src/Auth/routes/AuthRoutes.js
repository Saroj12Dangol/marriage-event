const express = require("express");
const {
  ForgotPasswordController,
  ResetPasswordController,
  LoginController,
} = require("../controllers/AuthController");

const AuthRouter = express.Router();

// TODO: forgot password router============
AuthRouter.post("/forgot-password", ForgotPasswordController);

// TODO: reset password router============
AuthRouter.post("/reset-password", ResetPasswordController);

// TODO: reset password router============
AuthRouter.post("/login", LoginController);

module.exports = { AuthRouter };
