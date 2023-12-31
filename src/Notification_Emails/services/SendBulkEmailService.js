const { SendEmail } = require("../../../utils/Email");
const { EventModel } = require("../../Event/model/EventModel");
const Notification = require("../model/NotificationModel");

const SendBulkEmailService = async ({
  subject,
  text,
  purpose,
  res,
  to,
  event,
  query,
}) => {
  try {
    // TODO: fetch the emails of users to send email

    const eventGuests = await EventModel.findById(event).populate({
      path: "guests",
      match: query, // Filtering condition
    });

    let emails = [];

    if (!eventGuests) {
      return res.status(404).json({
        message: `${event} event is not found.`,
      });
    } else {
      // TODO: prevent the same email to be guest multiple times
      emails = eventGuests.guests.map((g) => g.email);
    }

    SendEmail(
      emails,
      subject,
      text,
      purpose,
      event,
      [],
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
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { SendBulkEmailService };
