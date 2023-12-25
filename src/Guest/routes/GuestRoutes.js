const express = require("express");
const {
  CreateGuestController,
  FetchGuestController,
  EditGuestController,
  ToggleGuestEventStatusController,
  DeleteGuestController,
} = require("../controllers/GuestController");
const IsAdmin = require("../../../middlewares/AdminProtect");

const GuestRouter = express.Router();

// TODO: post guest controller============
GuestRouter.post("/", IsAdmin, CreateGuestController);

// =========

// TODO: add guests to event

GuestRouter.post("/add-to-event/:eventId", IsAdmin, CreateGuestController);

// ===========

// TODO: get guest Router

GuestRouter.get("/", IsAdmin, FetchGuestController);

// ===========

// TODO: delete guest Router

GuestRouter.delete("/:guestId", IsAdmin, DeleteGuestController);

// ===========

// TODO: edit guest Router

GuestRouter.put("/:guestId", IsAdmin, EditGuestController);

GuestRouter.patch(
  "/toggle-event-status/:guestId",
  ToggleGuestEventStatusController
);

GuestRouter.patch(
  "/toggle-travel-status/:guestId",
  ToggleGuestEventStatusController
);

// ===========

module.exports = { GuestRouter };
