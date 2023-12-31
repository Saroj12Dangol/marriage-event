const bcrypt = require("bcryptjs");

const generateToken = require("../../../utils/generateToken");
const AgencyModel = require("../model/AgencyModel");

const LoginAgencyService = async (email, password, res) => {
  try {
    const agency = await AgencyModel.findOne({ email });

    if (!agency) {
      return res.status(404).json({
        error: `${email} Not Found`,
      });
    }

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
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { LoginAgencyService };
