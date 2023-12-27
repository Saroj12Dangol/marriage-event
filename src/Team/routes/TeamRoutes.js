const express = require("express");
const {
  CreateTeamController,
  fetchTeamController,
  LoginTeamController,
  GetLoggedInUserController,
  FetchTeamByIdController,
  DeleteTeamController,
  EditTeamController,
} = require("../controllers/TeamController");
const IsAdmin = require("../../../middlewares/AdminProtect");
const {
  EditGuestController,
} = require("../../Guest/controllers/GuestController");

const TeamRouter = express.Router();

// TODO: post team controller============
TeamRouter.post("/", CreateTeamController);

// =========

// TODO: get team controller

TeamRouter.get("/", IsAdmin, fetchTeamController);

// ===========

// TODO: get team controller

TeamRouter.put("/:teamId", IsAdmin, EditTeamController);

// ===========

// TODO: login team

TeamRouter.post("/login", LoginTeamController);

// ===========

// TODO: get loggedinuser team

TeamRouter.get("/getloggedinuser", GetLoggedInUserController);

// ===========

// TODO: get team detail Router

TeamRouter.get("/detail/:teamId", IsAdmin, FetchTeamByIdController);
// ===========

// TODO: delete team controller
TeamRouter.delete("/:teamId", IsAdmin, DeleteTeamController);

module.exports = { TeamRouter };
