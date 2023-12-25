const express = require("express");

const { upload } = require("../../../utils/ImageUpload");
const {
  CreateMemoriesController,
  FetchMemoriesController,
} = require("../controllers/MemoriesController");

const MemoriesRouter = express.Router();

// TODO: post memories controller============
MemoriesRouter.post(
  "/",
  upload.fields([{ name: "images" }]),
  CreateMemoriesController
);

// =========

// TODO: get memories Router

MemoriesRouter.get("/", FetchMemoriesController);

// ===========

module.exports = { MemoriesRouter };
