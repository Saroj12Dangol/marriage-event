const jwt = require("jsonwebtoken");

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

    const resetToken = jwt.sign(
      { id: team ? team._id : agency._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "600000",
      }
    );

    if (team) {
      team.resetToken = resetToken;
      await team.save();
    }

    if (agency) {
      agency.resetToken = resetToken;
      await agency.save();
    }

    // SendEmail({
    //   emails: [email],
    //   purpose: "forgot-password",
    //   link: `${process.env.FORGOT_PASSWORD_URL}?token=${resetToken}&id=${
    //     team?._id || agency?._id
    //   }`,
    //   subject: ForgotPassword.subject,
    //   text: ForgotPassword.text,
    // });

    return res.status(200).json({
      message: `Email sent to ${email}`,
      link: `${process.env.FORGOT_PASSWORD_URL}?token=${resetToken}`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { ForgotPasswordService };
