const { Queue } = require("bullmq");
const { SendEmail } = require("../../../utils/Email");
const Notification = require("../model/NotificationModel");
const GuestModel = require("../../Guest/model/GuestModel");

const SendEmailService = async ({ subject, text, purpose, query, res, to }) => {
  try {
    // TODO: fetch the emails of users to send email

    const guests = await GuestModel.find(query).select(
      "email eventStatus travelStatus"
    );

    console.log(guests, "guests");

    const emails = guests.map((g) => g.email);

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
      message: "Sent",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { SendEmailService };
