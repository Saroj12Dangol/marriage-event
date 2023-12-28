const mailer = require("nodemailer");
const {
  invitationTemplate,
} = require("../constants/emailTemplates/InvitationTemplate");
const {
  agencyTemplate,
} = require("../constants/emailTemplates/agencyTemplate");
const {
  dayInfoTemplate,
} = require("../constants/emailTemplates/dayInfoTemplate");
const {
  RoomBookedTemplate,
} = require("../constants/emailTemplates/RoomBookedTemplate");
const { purposeObj } = require("../constants/statuses");
const {
  TravelDetailTemplate,
} = require("../constants/emailTemplates/TravelDetailTemplate");

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
    await mail_transport_mail_transport.sendMail({
      from: process.env.EMAIL_SENDER,
      to: emails,
      subject,
      text,
      html:
        purpose === purposeObj.invitation ||
        purpose === purposeObj.alertInvitation
          ? invitationTemplate(subject, text, eventId, eventTitle)
          : purpose === purposeObj.travelAgency
          ? agencyTemplate(subject, text, eventId, eventTitle)
          : purpose === purposeObj.accommodation
          ? RoomBookedTemplate(subject, text, room, hotel, eventTitle)
          : purpose === purposeObj.askTravelDetail ||
            purposeObj.alertAskTravelDetail
          ? TravelDetailTemplate(subject, text, eventId, eventTitle)
          : dayInfoTemplate(subject, text, days, eventTitle),
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { SendEmail };
