const { RoomAssigned } = require("../../../constants/EmailContants");
const { purposeObj, travelStatusObj } = require("../../../constants/statuses");
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

    guest.travelStatus = travelStatusObj.roomAssigned;

    const updatedGuest = await guest.save();

    SendEmail({
      emails: guest.email,
      subject: RoomAssigned.subject,
      text: RoomAssigned.text,
      purpose: purposeObj.accommodation,
      eventTitle,
      hotel: guest.hotel,
      room: guest.room,
      checkInDate: guest.checkInDate,
      checkoutDate: guest.checkOutDate,
    });

    return res.status(200).json({
      data: updatedGuest,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { RoomAssignService };
