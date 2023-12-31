const AgencyModel = require("../model/AgencyModel");

const fetchAgencyService = async (req, res) => {
  try {
    const agency = await AgencyModel.find();

    return res.status(200).json({
      data: agency,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { fetchAgencyService };
