const express = require("express");
const { DeleteImageController } = require("../controllers/MediaController");

const MediaRouter = express.Router();

// TODO: delete image controller============
MediaRouter.delete("/delete/:imageId", DeleteImageController);

// ===========

module.exports = { MediaRouter };
