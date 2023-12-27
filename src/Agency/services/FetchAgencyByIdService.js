const AgencyModel = require("../model/AgencyModel");

const FetchAgencyByIdService = async (agencyId, res, populateObj) => {
  try {
    const agency = await AgencyModel.findById(agencyId)
      .populate(populateObj)
      .select("-password");

    if (!agency) {
      return res.status(404).json({
        message: `${agencyId} is not found.`,
      });
    } else {
      return res.status(200).json({
        data: agency,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { FetchAgencyByIdService };
