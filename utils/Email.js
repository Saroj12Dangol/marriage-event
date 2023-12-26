const mailer = require("nodemailer");
const {
  invitationTemplate,
} = require("../constants/emailTemplates/InvitationTemplate");
const {
  agencyTemplate,
} = require("../constants/emailTemplates/agencyTemplate");
const {
  accommodationTemplate,
} = require("../constants/emailTemplates/accomodationTemplate");

const SendEmail = async (
  to,
  subject,
  text,
  purpose,
  eventId,
  days,
  eventTitle,
  res
) => {
  console.log(purpose, "pur");
  var mail_transport_mail_transport = mailer.createTransport({
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_AUTHORITY,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    const email = await mail_transport_mail_transport.sendMail({
      from: process.env.EMAIL_SENDER,
      to,
      subject,
      text,
      html:
        purpose === "invitation"
          ? invitationTemplate(subject, text, eventId, eventTitle)
          : purpose === "agency"
          ? agencyTemplate(subject, text, eventId, eventTitle)
          : accommodationTemplate(subject, text, eventId, days, eventTitle),
    });

    console.log(email.accepted);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { SendEmail };
