const { SendEmail } = require("../../../utils/Email");
const Notification = require("../model/NotificationModel");
const { EventModel } = require("../../Event/model/EventModel");

const accommodationIndividualEmailsService = async ({
  subject,
  text,
  purpose,
  res,
  to,
  event,
  emails,
  days,
  rooms,
  hotels,
}) => {
  try {
    const eventDetail = await EventModel.findById(event);

    SendEmail(
      emails,
      subject,
      text,
      purpose,
      event,
      days,
      eventDetail.title,
      res,
      rooms,
      hotels
    );

    emails.forEach(async (email) => {
      const notification = new Notification({
        toEmail: email,
        subject,
        body: text,
        purpose,
        to,
      });
      await notification.save();
    });

    return res.status(200).json({
      message: "Sent",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { accommodationIndividualEmailsService };
