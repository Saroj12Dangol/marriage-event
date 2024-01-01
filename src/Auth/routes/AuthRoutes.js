const express = require("express");
const {
  ForgotPasswordController,
  ResetPasswordController,
  LoginController,
  GetLoggedInUserController,
} = require("../controllers/AuthController");

const AuthRouter = express.Router();

// TODO: forgot password router============
AuthRouter.post("/forgot-password", ForgotPasswordController);

// TODO: reset password router============
AuthRouter.post("/reset-password", ResetPasswordController);

// TODO: reset password router============
AuthRouter.post("/login", LoginController);

// TODO: get loggedinuser

AuthRouter.get("/getloggedinuser", GetLoggedInUserController);

// ===========

module.exports = { AuthRouter };
