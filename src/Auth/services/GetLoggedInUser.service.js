const jwt = require("jsonwebtoken");
const TeamModel = require("../../Team/model/TeamModel");
const AgencyModel = require("../../Agency/model/AgencyModel");

const GetLoggedInUserService = async (token, res) => {
  try {
    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET);
      if (!id) {
        return res.status(401).json({
          error: "Not authorized token expired, login again",
        });
      }
      const team = await TeamModel.findById(id).select("-password -token");

      const agency = await AgencyModel.findById(id).select("-password -token");

      if (!team && !agency) {
        return res.status(404).json({
          error: "Not Found",
        });
      }

      if (team) {
        return res.status(200).json({
          data: team,
        });
      }

      if (agency) {
        return res.status(200).json({
          data: agency,
        });
      }

      return res.status(200).json({
        data: team || agency,
      });
    } else {
      return res.status(400).json({
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
