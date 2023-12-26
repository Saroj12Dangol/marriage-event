const { Queue } = require("bullmq");
const { SendEmail } = require("../../../utils/Email");
const Notification = require("../model/NotificationModel");
const GuestModel = require("../../Guest/model/GuestModel");
const EventModel = require("../../Event/model/EventModel");

const SendEmailService = async ({
  subject,
  text,
  purpose,
  query,
  res,
  to,
  event,
}) => {
  try {
    // TODO: fetch the emails of users to send email

    const eventGuests = await EventModel.findById(event).populate("guests");

    let emails = [];

    if (!eventGuests) {
      return res.status(404).json({
        message: `${event} event is not found.`,
      });
    } else {
      // TODO: prevent the same email to be guest multiple times
      emails = eventGuests.guests.map((g) => g.email);
    }

    SendEmail(emails, subject, text);

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

module.exports = { SendEmailService };
