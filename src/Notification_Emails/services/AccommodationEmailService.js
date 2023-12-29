const { SendEmail } = require("../../../utils/Email");
const { EventModel } = require("../../Event/model/EventModel");
const Notification = require("../model/NotificationModel");

const accommodationEmailService = async ({
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
    const eventGuests = await EventModel.findById(event);

    if (!eventGuests) {
      return res.status(404).json({
        message: `${event} event is not found.`,
      });
    }

    // TODO: fetch the emails of users to send email
    SendEmail(
      emails,
      subject,
      text,
      purpose,
      event,
      days,
      eventGuests.title,
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
      message: `Sent to ${emails}`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { accommodationEmailService };
