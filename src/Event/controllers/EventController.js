// TODO: create Bride's profile

const { page, limit } = require("../../../constants/paginationConstants");
const { populateFunctionality } = require("../../../utils/Populate");
const {
  AddAgencyToEventService,
} = require("../services/AddAgencyToEventService");
const { CreateEventService } = require("../services/CreateEventService");
const { DeleteEventService } = require("../services/DeleteEventService");
const { EditEventService } = require("../services/EditEventService");
const { FetchEventByIdService } = require("../services/FetchEventByIdService");
const { FetchEventService } = require("../services/FetchEventService");

const CreateEventController = async (req, res) => {
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = [
    "startDateTime",
    "endDateTime",
    "title",
    "description",
    "venue",
    "brideName",
    "groomName",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // TODO: ==========\

  CreateEventService(req, res);
};

// TODO: fetch event

const FetchEventController = async (req, res) => {
  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }

  const pg = parseInt(req.query.page) || page;
  const lmt = parseInt(req.query.limit) || limit;

  const skip = (pg - 1) * lmt;

  FetchEventService(res, populateObj, pg, lmt, skip);
};

// TODO: fetch event detail

const FetchEventByIdController = async (req, res) => {
  const { eventId } = req.params;

  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }
  FetchEventByIdService(eventId, res, populateObj);
};

// TODO: add agency to controller
const addAgencyToEventController = async (req, res) => {
  const { agencyId } = req.body;
  const { eventId } = req.params;

  AddAgencyToEventService(agencyId, eventId, res);
};

// TODO: edit event  controller
const EditEventController = async (req, res) => {
  const { eventId } = req.params;
  EditEventService(eventId, req, res);
};

// TODO: delete event controller
const DeleteEventController = async (req, res) => {
  const { eventId } = req.params;

  DeleteEventService(eventId, res);
};

module.exports = {
  CreateEventController,
  FetchEventController,
  addAgencyToEventController,
  FetchEventByIdController,
  EditEventController,
  DeleteEventController,
};
