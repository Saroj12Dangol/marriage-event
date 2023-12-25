const express = require("express");
const {
  CreateLoveStoryController,
  EditLoveStoryController,
  DeleteLoveStoryController,
} = require("../controllers/LoveStoryController");
const IsAdmin = require("../../../middlewares/AdminProtect");
const { upload } = require("../../../utils/ImageUpload");

const LoveStoryRouter = express.Router();

// TODO: post days router============
LoveStoryRouter.post(
  "/:eventId",
  IsAdmin,
  upload.single("image"),
  CreateLoveStoryController
);

// ===========

// TODO: edit days router============
LoveStoryRouter.put(
  "/:loveStoryId",
  IsAdmin,
  upload.single("image"),
  EditLoveStoryController
);

// ===========

// TODO: delete days router============
LoveStoryRouter.delete("/:loveStoryId", IsAdmin, DeleteLoveStoryController);

// ===========

module.exports = { LoveStoryRouter };
