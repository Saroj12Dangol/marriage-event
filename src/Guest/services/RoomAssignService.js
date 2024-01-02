const { RoomAssigned } = require("../../../constants/EmailContants");
const {
  RoomBookedTemplate,
} = require("../../../constants/emailTemplates/RoomBookedTemplate");
const { purposeObj, travelStatusObj } = require("../../../constants/statuses");
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
      emails: guest.email,
      template: RoomBookedTemplate(
        RoomAssigned.subject,
        RoomAssigned.text,
        guest.room,
        guest.hotel,
        guest.checkInDate,
        guest.checkOutDate,
        eventTitle
      ),
    });

    const notification = new NotificationModel({
      toEmail: emails,
      subject: RoomAssigned.subject,
      body: RoomAssigned.text,
      purpose: travelStatusObj.roomAssigned,
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
