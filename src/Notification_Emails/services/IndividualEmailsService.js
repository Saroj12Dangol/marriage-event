const { SendEmail } = require("../../../utils/Email");
const { EventModel } = require("../../Event/model/EventModel");
const Notification = require("../model/NotificationModel");

const IndividualEmailsService = async ({
  subject,
  text,
  purpose,
  res,
  to,
  emails,
  event,
}) => {
  try {
    const eventDetail = await EventModel.findById(event);

    SendEmail(
      emails,
      subject,
      text,
      purpose,
      event,
      [],
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
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { IndividualEmailsService };
