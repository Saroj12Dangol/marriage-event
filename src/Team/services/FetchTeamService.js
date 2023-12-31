const TeamModel = require("../model/TeamModel");

const FetchTeamService = async (role, res) => {
  console.log(role, "role");

  try {
    const teams = await TeamModel.find(role).select("-password");

    return res.status(200).json({
      data: teams,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { FetchTeamService };
