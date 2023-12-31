const TeamModel = require("../model/TeamModel");

const CreateTeamService = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await TeamModel.findOne({
      email,
    });

    if (user) {
      return res.status(400).json({
        error: `${email} already exists.`,
      });
    } else {
      const newTeam = new TeamModel(req.body);
      const team = await newTeam.save();
      const responseData = await TeamModel.findById(team._id).select(
        "-password"
      );

      return res.status(200).json({
        data: responseData,
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { CreateTeamService };
