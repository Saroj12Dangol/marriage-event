const bcrypt = require("bcryptjs");

const AgencyModel = require("../../Agency/model/AgencyModel");
const TeamModel = require("../../Team/model/TeamModel");

const ResetPasswordService = async (userId, token, newPassword, res) => {
  try {
    const team = await TeamModel.findById(userId);
    const agency = await AgencyModel.findById(userId);

    if (!team && !agency) {
      return res.status(404).json({
        status: false,
        message: `${userId} is not found in our system`,
      });
    }

    let isTokenMatch;

    if (team) {
      isTokenMatch = await bcrypt.compare(token, team.resetToken);
      if (isTokenMatch) {
        team.password = newPassword;
        await team.save();
        return res.status(201).json({
          message: "Your password has been reset",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Your token is invalid or expired",
        });
      }
    }

    if (agency) {
      isTokenMatch = await bcrypt.compare(token, agency.resetToken);
      if (isTokenMatch) {
        agency.password = newPassword;
        await agency.save();
        return res.status(201).json({
          message: "Your password has been reset",
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Your token is invalid or expired",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { ResetPasswordService };
