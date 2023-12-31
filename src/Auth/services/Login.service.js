const bcrypt = require("bcryptjs");
const TeamModel = require("../../Team/model/TeamModel");
const AgencyModel = require("../../Agency/model/AgencyModel");
const generateToken = require("../../../utils/generateToken");

const LoginService = async (email, password, res) => {
  try {
    const team = await TeamModel.findOne({ email });
    const agency = await AgencyModel.findOne({ email });

    if (!team && !agency) {
      return res.status(404).json({
        error: `${email} Not Found`,
      });
    }

    if (team) {
      const isPasswordMatch = await bcrypt.compare(password, team.password);
      if (isPasswordMatch) {
        const token = generateToken(team._id);
        team.token = token;
        await team.save();
        const responseData = await TeamModel.findById(team._id).select(
          "-password"
        );
        return res.status(200).json({
          data: responseData,
        });
      } else {
        return res.status(404).json({
          error: "Invalid email or password",
        });
      }
    }

    if (agency) {
      const isPasswordMatch = await bcrypt.compare(password, agency.password);
      if (isPasswordMatch) {
        const token = generateToken(agency._id);
        agency.token = token;
        await agency.save();
        const responseData = await AgencyModel.findById(agency._id).select(
          "-password"
        );
        return res.status(200).json({
          data: responseData,
        });
      } else {
        return res.status(404).json({
          error: "Invalid email or password",
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { LoginService };
