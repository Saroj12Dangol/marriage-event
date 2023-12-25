const express = require("express");
const {
  CreateDaysController,
  EditDaysController,
  DeleteDaysController,
} = require("../controllers/DaysController");
const IsAdmin = require("../../../middlewares/AdminProtect");
const { upload } = require("../../../utils/ImageUpload");

const DaysRouter = express.Router();

// TODO: post days router============
DaysRouter.post(
  "/:eventId",
  IsAdmin,
  upload.single("image"),
  CreateDaysController
);

// ===========

// TODO: edit days router============
DaysRouter.put("/:dayId", IsAdmin, upload.single("image"), EditDaysController);

// ===========

// TODO: delete days router============
DaysRouter.delete("/:dayId", IsAdmin, DeleteDaysController);

// ===========

module.exports = { DaysRouter };
