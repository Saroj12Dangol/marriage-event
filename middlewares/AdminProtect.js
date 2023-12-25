const jwt = require("jsonwebtoken");
const TeamModel = require("../src/Team/model/TeamModel");

// TODO:  this is done to protect the system from unAuthorized loggedIns.
const IsAdmin = async (req, res, next) => {
  const tokenWith = req.headers.authorization || ""; //TODO: get the token from the cookies from frontend.
  const token = tokenWith.substring("Bearer ".length);

  try {
    if (token) {
      const { id } = jwt.verify(token, process.env.JWT_SECRET); //TODO: extract the user's id from the token from cookies.
      const team = await TeamModel.findById(id).select("-password"); //TODO: get the user from the db with id same as the user's id we just extracted from the token. if the user exists then we go to next function otherwise return the forbidden error

      req.team = team;

      if (req.team.role !== "admin") {
        return res.status(403).json({
          error: "Not authorized for this action",
        });
      }

      next();
    } else {
      return res.status(403).json({
        error: "Not authorized token expired, login again",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
    // throw new Error("Not authorized token expired, login again")
  }
};

module.exports = IsAdmin;
