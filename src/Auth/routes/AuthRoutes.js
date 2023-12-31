const express = require("express");
const { ForgotPasswordController, ResetPasswordController } = require("../controllers/AuthController");

const AuthRouter = express.Router();

// TODO: forgot password router============
AuthRouter.post("/forgot-password", ForgotPasswordController);


// TODO: reset password router============
AuthRouter.post("/reset-password", ResetPasswordController);

module.exports = { AuthRouter };
