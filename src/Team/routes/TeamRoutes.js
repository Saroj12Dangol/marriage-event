const express = require("express");
const {
  CreateTeamController,
  fetchTeamController,
  FetchTeamByIdController,
  DeleteTeamController,
  EditTeamController,
  ChangePwTeamController,
} = require("../controllers/TeamController");
const IsAdmin = require("../../../middlewares/AdminProtect");

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

// ===========

// TODO: get team detail Router

TeamRouter.get("/detail/:teamId", IsAdmin, FetchTeamByIdController);
// ===========

// TODO: delete team controller
TeamRouter.delete("/:teamId", IsAdmin, DeleteTeamController);

// TODO: change pw of team controller
TeamRouter.patch("/change-password/:teamId", IsAdmin, ChangePwTeamController);

module.exports = { TeamRouter };
