const express = require("express");

const { upload } = require("../../../utils/ImageUpload");
const {
  CreateEventController,
  FetchEventController,
  addAgencyToEventController,
  FetchEventByIdController,
  EditEventController,
} = require("../controllers/EventController");

const IsAdmin = require("../../../middlewares/AdminProtect");

const EventRouter = express.Router();

// TODO: post couple controller============
EventRouter.post(
  "/",
  IsAdmin,
  upload.fields([{ name: "backgrounds" }]),
  CreateEventController
);

// =========

// TODO: get event Router

EventRouter.get("/", IsAdmin, FetchEventController);

// ===========

// TODO: get event detail Router

EventRouter.get("/detail/:eventId", IsAdmin, FetchEventByIdController);

// ===========

// TODO: add agency to event

EventRouter.patch("/add/agency/:eventId", IsAdmin, addAgencyToEventController);

// ===========

// TODO: edit  event basic info

EventRouter.put(
  "/:eventId",
  IsAdmin,
  upload.fields([{ name: "backgrounds" }]),
  EditEventController
);

// ===========

module.exports = { EventRouter };
