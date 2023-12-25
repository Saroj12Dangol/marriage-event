const express = require("express");
const {
  CreateCloseFriendsController,
  EditCloseFriendController,
  DeleteCloseFriendsController,
} = require("../controllers/CloseFriendsControllers");
const { upload } = require("../../../utils/ImageUpload");
const IsAdmin = require("../../../middlewares/AdminProtect");

const CloseFriendsRouter = express.Router();

// TODO: post close friends router============
CloseFriendsRouter.post(
  "/:eventId",
  IsAdmin,
  upload.single("image"),
  CreateCloseFriendsController
);

// ===========

// TODO: edit close friends router============
CloseFriendsRouter.put(
  "/:friendId",
  IsAdmin,
  upload.single("image"),
  EditCloseFriendController
);

// TODO: delete friends router============
CloseFriendsRouter.delete("/:friendId", IsAdmin, DeleteCloseFriendsController);

// ===========

module.exports = { CloseFriendsRouter };
