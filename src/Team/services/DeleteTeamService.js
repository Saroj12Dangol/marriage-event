const TeamModel = require("../model/TeamModel");

const DeleteTeamService = async (teamId, res) => {
  try {
    const team = await TeamModel.findById(teamId);
    if (!team) {
      return res.status(200).json({
        message: `${teamId} team is not found`,
      });
    }

    await TeamModel.deleteOne({ _id: teamId });

    return res.status(200).json({
      message: `${teamId} team is deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { DeleteTeamService };
