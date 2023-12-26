const { SendEmail } = require("../../../utils/Email");
const Notification = require("../model/NotificationModel");

const AccommodatationEmailService = async ({
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
    // TODO: fetch the emails of users to send email
    SendEmail(emails, subject, text, purpose, event, days, res);

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

module.exports = { AccommodatationEmailService };
