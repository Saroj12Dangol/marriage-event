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
const {
  ForgotPasswordTemplate,
} = require("../constants/emailTemplates/forgotPassword.template");

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
  checkInDate,
  checkoutDate,
  link,
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
          ? RoomBookedTemplate(
              subject,
              text,
              room,
              hotel,
              checkInDate,
              checkoutDate,
              eventTitle
            )
          : purpose === purposeObj.askTravelDetail ||
            purposeObj.alertAskTravelDetail
          ? TravelDetailTemplate(subject, text, eventId, eventTitle)
          : purpose === "forgot-password"
          ? ForgotPasswordTemplate(subject, text, link)
          : purpose === purposeObj.daysInformation
          ? dayInfoTemplate(subject, text, link)
          : null,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { SendEmail };
