const CoupleModel = require("../model/CoupleModel");

const FetchCoupleService = async (role, res, populateObj) => {
  try {
    const couples = await CoupleModel.find({}).populate(populateObj);

    return res.status(200).json({
      data: couples,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { FetchCoupleService };
