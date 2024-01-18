const express = require("express");
const {
  CreateGuestController,
  FetchGuestController,
  EditGuestController,
  ToggleGuestEventStatusController,
  DeleteGuestController,
  CreateGuestInBulkController,
  AllocationRoomController,
  AcceptInvitationGuestController,
  GuestReceivedController,
} = require("../controllers/GuestController");
const IsAdmin = require("../../../middlewares/AdminProtect");
const { IsGuestOfEvent } = require("../../../middlewares/IsGuestOfEvent");

const GuestRouter = express.Router();

// TODO: post guest controller============
GuestRouter.post("/", IsAdmin, CreateGuestController);

// =========

// TODO: add guests to event

GuestRouter.post("/add-to-event/:eventId", IsAdmin, CreateGuestController);

// ===========

// TODO: add guests to event in bulk

GuestRouter.post(
  "/add-to-event/bulk/:eventId",
  IsAdmin,
  CreateGuestInBulkController
);

// ===========

// TODO: get guest Router

GuestRouter.get("/", IsAdmin, FetchGuestController);

// ===========

// TODO: delete guest Router

GuestRouter.delete("/:guestId", IsAdmin, DeleteGuestController);

// ===========

// TODO: edit guest Router

GuestRouter.put("/:guestId", EditGuestController);

GuestRouter.patch(
  "/toggle-event-status/:guestId",
  ToggleGuestEventStatusController
);

GuestRouter.patch(
  "/toggle-travel-status/:guestId",
  ToggleGuestEventStatusController
);

// TODO: allocate hotel room to guest
// GuestRouter.patch("/add-room/:guestId", AllocationRoomController);

// // ===========

// TODO: make guest received by agency
GuestRouter.patch("/received/:guestId", GuestReceivedController);

// ===========

// TODO: accept the invitation
GuestRouter.put(
  "/accept-invitation/:eventId",
  // IsGuestOfEvent,
  AcceptInvitationGuestController
);

// ===========

// TODO: allocate hotel room to guest

GuestRouter.patch(
  "/add-room/:guestId/:eventId",
  IsGuestOfEvent,
  AllocationRoomController
);

// ===========

module.exports = { GuestRouter };
