const { SendEmail } = require("../../../utils/Email");
const GuestModel = require("../model/GuestModel");

const RoomAssignService = async (guestId, eventTitle, body, res) => {
  try {
    const guest = await GuestModel.findOneAndUpdate(
      { _id: guestId },
      { $set: body },
      { new: true }
    );

    if (!guest) {
      return res.status(404).json({
        message: `${guest} guest is not found`,
      });
    }

    SendEmail(guest.email, "", "", "day-information", "", [], eventTitle, {}, guest.hotel, guest.roomNo);

    return res.status(200).json({
      data: guest,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { RoomAssignService };
