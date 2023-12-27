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
const {
  RoomBookedTemplate,
} = require("../constants/emailTemplates/RoomBookedTemplate");

const SendEmail = async ({
  emails,
  subject,
  text,
  purpose,
  eventId,
  days,
  eventTitle,
  hotel,
  room,
}) => {
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
      to: emails,
      subject,
      text,
      html:
        purpose === "invitation"
          ? invitationTemplate(subject, text, eventId, eventTitle)
          : purpose === "agency"
          ? agencyTemplate(subject, text, eventId, eventTitle)
          : purpose === "accommodatation"
          ? RoomBookedTemplate(subject, text, room, hotel, eventTitle)
          : accommodationTemplate(subject, text, days, eventTitle),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { SendEmail };
