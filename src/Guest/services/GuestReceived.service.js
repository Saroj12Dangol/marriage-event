const { travelStatusObj } = require("../../../constants/statuses");
const GuestModel = require("../model/GuestModel");

const GuestReceivedService = async (guestId, res) => {
  try {
    const guest = await GuestModel.findById(guestId);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: `${guestId} not found`,
      });
    }

    guest.travelStatus = travelStatusObj.received;

    const newGuest = await guest.save();

    return res.status(201).json({
      data: newGuest,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { GuestReceivedService };
