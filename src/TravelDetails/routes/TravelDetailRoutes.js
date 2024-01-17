const express = require("express");
const { upload } = require("../../../utils/ImageUpload");
const {
  CreateTravelDetailsController,
  UpdateTravelDetailsController,
} = require("../controllers/TravelDetailController");
const { IsGuestOfEvent } = require("../../../middlewares/IsGuestOfEvent");

const TravelRouter = express.Router();

// TODO: post days router============
TravelRouter.post(
  "/:eventId",
  upload.single("ticketImage"),
  IsGuestOfEvent,
  CreateTravelDetailsController
);

TravelRouter.put(
  "/:travelId",
  upload.single("ticketImage"),
  // IsGuestOfEvent,
  UpdateTravelDetailsController
);

// ===========

module.exports = { TravelRouter };
