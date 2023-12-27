const express = require("express");
const { upload } = require("../../../utils/ImageUpload");
const {
  CreateTravelDetailsController,
} = require("../controllers/TravelDetailController");

const TravelRouter = express.Router();

// TODO: post days router============
TravelRouter.post(
  "/:eventId",
  upload.single("image"),
  CreateTravelDetailsController
);

// ===========

module.exports = { TravelRouter };
