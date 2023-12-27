const express = require("express");
const {
  CreateDaysController,
  EditDaysController,
  DeleteDaysController,
} = require("../controllers/DaysController");
const IsAdmin = require("../../../middlewares/AdminProtect");
const { upload } = require("../../../utils/ImageUpload");

const TravelRouter = express.Router();

// TODO: post days router============
TravelRouter.post("/:eventId", upload.single("image"), CreateDaysController);

// ===========

// TODO: edit days router============
TravelRouter.put(
  "/:dayId",
  IsAdmin,
  upload.single("image"),
  EditDaysController
);

// ===========

// TODO: delete days router============
TravelRouter.delete("/:dayId", IsAdmin, DeleteDaysController);

// ===========

module.exports = { TravelRouter };
