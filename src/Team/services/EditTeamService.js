const TeamModel = require("../model/TeamModel");

const EditTeamService = async (teamId, req, res) => {
  try {
    const updatedTeam = await TeamModel.findOneAndUpdate(
      { _id: teamId },
      { $set: req.body },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!updatedTeam) {
      return res.status(404).json({
        message: `Guest with ID ${teamId} not found`,
      });
    }

    return res.status(200).json({
      data: updatedTeam,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { EditTeamService };
