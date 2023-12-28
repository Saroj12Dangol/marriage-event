const GuestModel = require("../model/GuestModel");

const FetchGuestService = async (res, populateObj) => {
  try {
    const guests = await GuestModel.find().populate(populateObj);

    return res.status(200).json({
      data: guests,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { FetchGuestService };
