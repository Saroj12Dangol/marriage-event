const { ForgotPasswordService } = require("../services/ForgotPassword.service");
const { GetLoggedInUserService } = require("../services/GetLoggedInUser.service");
const { LoginService } = require("../services/Login.service");
const { ResetPasswordService } = require("../services/ResetPassword.service");

// TODO: send link to forgot password
const ForgotPasswordController = (req, res) => {
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["email"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { email } = req.body;

  ForgotPasswordService(email, res);
};

// TODO: reset password

const ResetPasswordController = (req, res) => {
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["userId", "token", "newPassword"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { userId, token, newPassword } = req.body;

  ResetPasswordService(userId, token, newPassword, res);
};

// TODO: reset password

const LoginController = (req, res) => {
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["email", "password"];

  const { email, password } = req.body;

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  LoginService(email, password, res);
};

// TODO: get logged in user
const GetLoggedInUserController = async (req, res) => {
  const tokenWith = req.headers.authorization || ""; //TODO: get the token from the cookies from frontend.
  const token = tokenWith.substring("Bearer ".length);
  // TODO: =================
  GetLoggedInUserService(token, res);
};
module.exports = {
  ForgotPasswordController,
  ResetPasswordController,
  LoginController,
  GetLoggedInUserController,
};
