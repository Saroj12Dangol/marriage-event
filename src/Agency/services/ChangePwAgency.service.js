const bcrypt = require("bcryptjs");

const AgencyModel = require("../model/AgencyModel");

const ChangePwAgencyService = async (agencyId, newPassword, oldPassword, res) => {
  try {
    const agency = await AgencyModel.findById(agencyId);
    if (!agency) {
      return res.status(200).json({
        message: `${agencyId} agency is not found`,
      });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, agency.password);

    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Incorrect old password",
      });
    }

    agency.password = newPassword;

    await agency.save();

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

module.exports = { ChangePwAgencyService };
