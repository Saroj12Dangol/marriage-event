const { Queue } = require("bullmq");
const { SendEmail } = require("../../../utils/Email");
const Notification = require("../model/NotificationModel");
const GuestModel = require("../../Guest/model/GuestModel");

const IndividualEmailsService = async ({
  subject,
  text,
  purpose,
  res,
  to,
  emails,
}) => {
  try {
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

module.exports = { IndividualEmailsService };
