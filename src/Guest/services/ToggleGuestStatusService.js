const GuestModel = require("../model/GuestModel");

const ToggleGuestEventStatusService = async (status, guestId, res) => {
  try {
    const guest = await GuestModel.findById(guestId);
    if (!guest) {
      return res.status(404).json({
        message: `${guest} guest is not found`,
      });
    }

    guest.eventStatus = status;

    await guest.save();

    return res.status(200).json({
      data: guest,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const ToggleGuestTravelStatusService = async (status, guestId, res) => {
  try {
    const guest = await GuestModel.findById(guestId);
    if (!guest) {
      return res.status(404).json({
        message: `${guest} guest is not found`,
      });
    }

    guest.travelStatus = status;

    await guest.save();

    return res.status(200).json({
      data: guest,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  ToggleGuestEventStatusService,
  ToggleGuestTravelStatusService,
};
