const TeamModel = require("../../Team/model/TeamModel");
const AgencyModel = require("../model/AgencyModel");

const CreateAgencyService = async (req, res) => {
  try {
    // TODO: post agency in database

    const emailCheckAgency = await AgencyModel.findOne({
      email: req.body.email,
    });

    const emailCheckTeam = await TeamModel.findOne({
      email: req.body.email,
    });

    if (emailCheckAgency || emailCheckTeam) {
      return res.status(500).json({
        message: `${req.body.email} already exists.`,
      });
    }

    const newAgency = new AgencyModel(req.body);

    await newAgency.save();

    return res.status(200).json({
      data: newAgency,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { CreateAgencyService };
