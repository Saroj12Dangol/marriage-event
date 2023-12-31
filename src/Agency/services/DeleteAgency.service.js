const { EventModel } = require("../../Event/model/EventModel");
const AgencyModel = require("../model/AgencyModel");

const DeleteAgencyService = async (agencyId, res) => {
  try {
    const agency = await AgencyModel.findById(agencyId);
    if (!agency) {
      return res.status(200).json({
        message: `${agencyId} agency is not found`,
      });
    }

    await AgencyModel.deleteOne({ _id: agencyId });

    // Remove references from event Model
    await EventModel.updateMany(
      { $or: [{ agency: agencyId }] },
      {
        $unset: {
          agency: "",
        },
      }
    );

    return res.status(200).json({
      message: `${agencyId} agency is deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { DeleteAgencyService };
