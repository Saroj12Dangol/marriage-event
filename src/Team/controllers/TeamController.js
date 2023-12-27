const { CreateTeamService } = require("../services/CreateTeamService");
const { DeleteTeamService } = require("../services/DeleteTeamService");
const { EditTeamService } = require("../services/EditTeamService");
const { FetchTeamByIdService } = require("../services/FetchTeamByIdService");
const { FetchTeamService } = require("../services/FetchTeamService");
const {
  GetLoggedInUserService,
} = require("../services/GetLoggedInUserService");
const { LoginTeamService } = require("../services/LoginTeamService");

const CreateTeamController = async (req, res) => {
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = [
    "name",
    "email",
    "phone",
    "address",
    "password",
    "role",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // TODO: ==========\

  CreateTeamService(req, res);
};

// TODO: fetch all team members with filter
const fetchTeamController = async (req, res) => {
  const roleEnum = ["agency", "admin"];
  const { role } = req.query;

  const filterQuery = {};

  if (role === undefined) {
    FetchTeamService(filterQuery, res);
  } else {
    if (roleEnum.includes(role)) {
      filterQuery.role = role;
      FetchTeamService(filterQuery, res);
    } else {
      return res.status(400).json({
        message: `${role} is invalid role: should be ${roleEnum}`,
      });
    }
  }
};

// TODO: edit team member
// TODO: edit guest

const EditTeamController = async (req, res) => {
  const { teamId } = req.params;
  EditTeamService(teamId, req, res);
};

const LoginTeamController = async (req, res) => {
  const requiredFields = ["email", "password"];

  const { email, password } = req.body;

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // TODO: =================
  LoginTeamService(email, password, res);
};

const GetLoggedInUserController = async (req, res) => {
  const tokenWith = req.headers.authorization || ""; //TODO: get the token from the cookies from frontend.
  const token = tokenWith.substring("Bearer ".length);
  // TODO: =================
  GetLoggedInUserService(token, res);
};

// TODO: fetch team detail

const FetchTeamByIdController = async (req, res) => {
  const { teamId } = req.params;

  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }
  FetchTeamByIdService(teamId, res, populateObj);
};

// TODO: agency edit controller

const DeleteTeamController = async (req, res) => {
  const { teamId } = req.params;
  DeleteTeamService(teamId, res);
};

module.exports = {
  CreateTeamController,
  fetchTeamController,
  LoginTeamController,
  GetLoggedInUserController,
  EditTeamController,
  FetchTeamByIdController,
  DeleteTeamController,
};
