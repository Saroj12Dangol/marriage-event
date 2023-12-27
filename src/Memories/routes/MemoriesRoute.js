const express = require("express");

const { upload } = require("../../../utils/ImageUpload");
const {
  CreateMemoriesController,
  FetchMemoriesController,
  EditMemoriesController,
  DeleteMemoryController,
} = require("../controllers/MemoriesController");

const MemoriesRouter = express.Router();

// TODO: post memories controller============
MemoriesRouter.post(
  "/:eventId",
  upload.fields([{ name: "images" }]),
  CreateMemoriesController
);

// =========

// TODO: get memories Router

MemoriesRouter.get("/", FetchMemoriesController);

// ===========

// TODO: edit memories Router

MemoriesRouter.put(
  "/:memoryId",
  upload.fields([{ name: "images" }]),
  EditMemoriesController
);

// ===========

// TODO: delete memories Router

MemoriesRouter.delete("/:memoryId", DeleteMemoryController);

// ===========

module.exports = { MemoriesRouter };
