const CoupleModel = require("../model/CoupleModel");

const FetchCoupleByIdService = async (coupleId, res, populateObj) => {
  try {
    const couple = await CoupleModel.findById(coupleId).populate(populateObj);

    if (!couple) {
      return res.status(404).json({
        message: `${coupleId} is not found.`,
      });
    } else {
      return res.status(200).json({
        data: couple,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { FetchCoupleByIdService };
