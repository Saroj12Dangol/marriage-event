const express = require("express");
const {
  createAgencyController,
  fetchAgencyController,
  EditAgencyController,
  DeleteAgencyController,
  createAgencyFronEventController,
} = require("../controllers/AgencyController");
const IsAdmin = require("../../../middlewares/AdminProtect");

const AgencyRouter = express.Router();

// TODO: post agency from event controller============

AgencyRouter.post("/:eventId", IsAdmin, createAgencyFronEventController);
// =========

// TODO: post agency independent of event controller============

AgencyRouter.post("/", IsAdmin, createAgencyController);
// =========

// TODO: get agency controller
AgencyRouter.get("/", IsAdmin, fetchAgencyController);

// ===========

// TODO: edit agency controller
AgencyRouter.put("/:agencyId", IsAdmin, EditAgencyController);

// ===========

// TODO: delete agency controller
AgencyRouter.delete("/:agencyId", IsAdmin, DeleteAgencyController);

// ===========

module.exports = { AgencyRouter };
