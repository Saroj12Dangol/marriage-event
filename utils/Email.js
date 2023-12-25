const mailer = require("nodemailer");

const SendEmail = async (to, subject, text) => {
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
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { SendEmail };
