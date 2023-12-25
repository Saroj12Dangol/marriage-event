const express = require("express");
const {
  CreateCloseFriendsController,
} = require("../controllers/CloseFriendsControllers");
const { upload } = require("../../../utils/ImageUpload");

const CloseFriendsRouter = express.Router();

// TODO: post close friends router============
CloseFriendsRouter.post(
  "/:eventId",
  upload.single("image"),
  CreateCloseFriendsController
);

// ===========

module.exports = { CloseFriendsRouter };
