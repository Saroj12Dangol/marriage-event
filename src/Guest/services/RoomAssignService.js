const { RoomAssigned } = require("../../../constants/EmailContants");
const {
  RoomBookedTemplate,
} = require("../../../constants/emailTemplates/RoomBookedTemplate");
const { travelStatusObj, purposeObj } = require("../../../constants/statuses");
const { SendEmail } = require("../../../utils/Email");
const NotificationModel = require("../../Notification_Emails/model/NotificationModel");
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
      subject: "Room booking",
      emails: guest.email,
      template: RoomBookedTemplate(
        RoomAssigned.subject,
        guest.name,
        guest.roomNo,
        guest.hotel,
        guest.checkInDate,
        guest.checkOutDate,
        eventTitle
      ),
    });

    const notification = new NotificationModel({
      toEmail: guest.email,
      subject: RoomAssigned.subject,
      body: RoomAssigned.text,
      purpose: purposeObj.accommodation,
      to: "Guest",
    });

    await notification.save();

    return res.status(200).json({
      data: updatedGuest,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { RoomAssignService };
