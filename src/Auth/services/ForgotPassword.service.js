const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const AgencyModel = require("../../Agency/model/AgencyModel");
const TeamModel = require("../../Team/model/TeamModel");
const { SendEmail } = require("../../../utils/Email");
const { ForgotPassword } = require("../../../constants/EmailContants");

const ForgotPasswordService = async (email, res) => {
  try {
    const team = await TeamModel.findOne({ email });
    const agency = await AgencyModel.findOne({ email });

    if (!team && !agency) {
      return res.status(404).json({
        status: false,
        message: `${email} is not found in our system`,
      });
    }

    // TODO: generate the reset token

    const resetToken = crypto.randomBytes(32).toString("hex");

    const salt = await bcrypt.genSalt(10);

    const hashResetToken = await bcrypt.hash(resetToken, Number(salt));

    if (team) {
      team.resetToken = hashResetToken;
      await team.save();
    }

    if (agency) {
      agency.resetToken = hashResetToken;
      await agency.save();
    }

    SendEmail({
      emails: [email],
      purpose: "forgot-password",
      link: `${process.env.FORGOT_PASSWORD_URL}?token=${resetToken}&id=${
        team?._id || agency?._id
      }`,
      subject: ForgotPassword.subject,
      text: ForgotPassword.text,
    });

    return res.status(200).json({
      message: `Email sent to ${email}`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { ForgotPasswordService };
