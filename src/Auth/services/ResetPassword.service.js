const jwt = require("jsonwebtoken");

const AgencyModel = require("../../Agency/model/AgencyModel");
const TeamModel = require("../../Team/model/TeamModel");

const ResetPasswordService = async (token, newPassword, res) => {
  try {
    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const team = await TeamModel.findById(decodedToken.id);

    const agency = await AgencyModel.findById(decodedToken.id);

    if (!team && !agency) {
      return res.status(404).json({
        status: false,
        message: `Your token is invalid or expired`,
      });
    }

    // Token is valid, check expiration
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
      return res.status(400).json({
        success: false,
        message: "Your token is invalid or expired",
      });
    }

    if (team) {
      if (token !== team.resetToken) {
        return res.status(400).json({
          success: false,
          message: "Your token is invalid or expired",
        });
      }
      team.password = newPassword;
      team.resetPassword = undefined;
      await team.save();
      return res.status(201).json({
        message: "Your password has been reset",
      });
    }

    if (agency) {
      if (token !== agency.resetToken) {
        return res.status(400).json({
          success: false,
          message: "Your token is invalid or expired",
        });
      }
      agency.password = newPassword;
      agency.resetPassword = undefined;
      await agency.save();
      return res.status(201).json({
        message: "Your password has been reset",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { ResetPasswordService };
