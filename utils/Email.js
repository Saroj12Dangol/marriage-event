const mailer = require("nodemailer");

const SendEmail = async ({ emails, subject, text, template }) => {
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
      html: template,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { SendEmail };
