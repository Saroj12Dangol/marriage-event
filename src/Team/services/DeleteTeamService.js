const EventModel = require("../../Event/model/EventModel");
const AgencyModel = require("../model/AgencyModel");

const DeleteTeamService = async (teamId, res) => {
  try {
    const agency = await AgencyModel.findById(teamId);
    if (!agency) {
      return res.status(200).json({
        message: `${teamId} agency is not found`,
      });
    }

    await AgencyModel.deleteOne({ _id: teamId });

    // Remove references from event Model
    await EventModel.updateMany(
      { $or: [{ agency: teamId }] },
      {
        $unset: {
          agency: "",
        },
      }
    );

    return res.status(200).json({
      message: `${teamId} agency is deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { DeleteTeamService };
