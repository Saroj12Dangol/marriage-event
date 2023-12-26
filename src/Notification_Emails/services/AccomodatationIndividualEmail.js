const { Queue } = require("bullmq");
const { SendEmail } = require("../../../utils/Email");
const Notification = require("../model/NotificationModel");
const EventModel = require("../../Event/model/EventModel");

const AccommodatationIndividualEmailsService = async ({
  subject,
  text,
  purpose,
  res,
  to,
  event,
  emails,
  days,
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
      res
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
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { AccommodatationIndividualEmailsService };
