const AgencyModel = require("../model/AgencyModel");

const fetchAgencyService = async (req, res) => {
  try {
    // TODO: post agency in database

    const agency = await AgencyModel.find();

    return res.status(200).json({
      data: agency,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { fetchAgencyService };
