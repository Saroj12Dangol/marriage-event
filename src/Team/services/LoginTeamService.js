const bcrypt = require("bcryptjs");

const TeamModel = require("../model/TeamModel");
const generateToken = require("../../../utils/generateToken");

const LoginTeamService = async (email, password, res) => {
  try {
    const team = await TeamModel.findOne({ email });

    if (!team) {
      return res.status(404).json({
        error: `${email} Not Found`,
      });
    }

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
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { LoginTeamService };
