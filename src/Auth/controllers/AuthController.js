const { ForgotPasswordService } = require("../services/ForgotPassword.service");
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
module.exports = {
  ForgotPasswordController,
  ResetPasswordController,
};
