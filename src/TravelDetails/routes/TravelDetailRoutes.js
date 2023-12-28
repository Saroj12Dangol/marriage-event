const express = require("express");
const { upload } = require("../../../utils/ImageUpload");
const {
  CreateTravelDetailsController,
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

// ===========

module.exports = { TravelRouter };
