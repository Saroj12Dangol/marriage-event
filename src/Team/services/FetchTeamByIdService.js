const TeamModel = require("../model/TeamModel");

const FetchTeamByIdService = async (teamId, res, populateObj) => {
  try {
    const team = await TeamModel.findById(teamId)
      .populate(populateObj)
      .select("-password");

    if (!team) {
      return res.status(404).json({
        message: `${teamId} is not found.`,
      });
    } else {
      return res.status(200).json({
        data: team,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { FetchTeamByIdService };
