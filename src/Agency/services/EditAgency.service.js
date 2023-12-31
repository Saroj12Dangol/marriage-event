const AgencyModel = require("../model/AgencyModel");

const EditAgencyService = async (agencyId, req, res) => {
  try {
    const updatedAgency = await AgencyModel.findOneAndUpdate(
      { _id: agencyId },
      { $set: req.body },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!updatedAgency) {
      return res.status(404).json({
        message: `Agency with ID ${agencyId} not found`,
      });
    }

    return res.status(200).json({
      data: updatedAgency,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { EditAgencyService };
