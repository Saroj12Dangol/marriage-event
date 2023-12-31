const bcrypt = require("bcryptjs");

const TeamModel = require("../model/TeamModel");

const ChangePwTeamService = async (teamId, newPassword, oldPassword, res) => {
  try {
    const team = await TeamModel.findById(teamId);
    if (!team) {
      return res.status(200).json({
        message: `${teamId} team is not found`,
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, team.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    team.password = newPassword;

    await team.save();

    return res.status(200).json({
      message: `Your password is changed`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { ChangePwTeamService };
