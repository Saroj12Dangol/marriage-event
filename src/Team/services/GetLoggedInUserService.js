const jwt = require("jsonwebtoken");

const TeamModel = require("../model/TeamModel");

const GetLoggedInUserService = async (token, res) => {
  try {
    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      const team = await TeamModel.findById(id).select("-password -token");
      return res.status(200).json({
        data: team,
      });
    } else {
      return res.status(403).json({
        error: "Not authorized token expired, login again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { GetLoggedInUserService };
