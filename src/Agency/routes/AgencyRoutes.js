const express = require("express");
const {
  createAgencyController,
  fetchAgencyController,
  EditAgencyController,
  DeleteAgencyController,
  createAgencyFronEventController,
  FetchAgencyByIdController,
  ChangePwAgencyController,
  LoginAgencyController,
} = require("../controllers/AgencyController");
const IsAdmin = require("../../../middlewares/AdminProtect");

const AgencyRouter = express.Router();

// TODO: post agency from event controller============

AgencyRouter.post(
  "/add-to-event/:eventId",
  IsAdmin,
  createAgencyFronEventController
);
// =========

// TODO: post agency independent of event controller============

AgencyRouter.post("/", IsAdmin, createAgencyController);
// =========

// TODO: login agency controller============

AgencyRouter.post("/login", LoginAgencyController);
// =========

// TODO: get agency controller
AgencyRouter.get("/", IsAdmin, fetchAgencyController);

// ===========

// TODO: edit agency controller
AgencyRouter.put("/:agencyId", EditAgencyController);

// ===========

// TODO: delete agency controller
AgencyRouter.delete("/:agencyId", IsAdmin, DeleteAgencyController);

// ===========

// TODO: get agency detail Router

AgencyRouter.get("/detail/:agencyId", IsAdmin, FetchAgencyByIdController);
// ===========

// TODO: change pw of agency controller
AgencyRouter.patch("/change-password/:agencyId", ChangePwAgencyController);

module.exports = { AgencyRouter };
