const GuestModel = require("../model/GuestModel");

const FetchGuestService = async (res) => {
  try {
    const guests = await GuestModel.find();

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
