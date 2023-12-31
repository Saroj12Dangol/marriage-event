const { travelStatusObj } = require("../../../constants/statuses");
const { populateFunctionality } = require("../../../utils/Populate");
const {
  AcceptInvitationService,
} = require("../services/AcceptInvitationService");
const {
  CreateGuestInBulkService,
} = require("../services/CreateGuestInBulkService");
const { CreateGuestService } = require("../services/CreateGuestService");
const { DeleteGuestService } = require("../services/DeleteGuestService");
const { EditGuestService } = require("../services/EditGuestService");
const { FetchGuestService } = require("../services/FetchGuestService");
const { GuestReceivedService } = require("../services/GuestReceived.service");
const { RoomAssignService } = require("../services/RoomAssignService");
const {
  ToggleGuestEventStatusService,
  ToggleGuestTravelStatusService,
} = require("../services/ToggleGuestStatusService");

const statusFields = ["accept", "reject", "pending"];

// TODO: create guest

const CreateGuestController = async (req, res) => {
  const { eventId } = req.params;
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["email"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // TODO: ==========\

  CreateGuestService(req, eventId, res);
};

// TODO: create guest in bulk
const CreateGuestInBulkController = async (req, res) => {
  const { eventId } = req.params;
  // TODO: ==========\

  CreateGuestInBulkService(req, eventId, res);
};

// TODO: fetch guest

const FetchGuestController = async (req, res) => {
  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }

  FetchGuestService(res, populateObj);
};

// TODO: edit guest

const EditGuestController = async (req, res) => {
  const { guestId } = req.params;
  const { status } = req.body;

  if (!status || statusFields.includes(status)) {
    EditGuestService(guestId, req, res);
  } else {
    return res.status(400).json({
      message: `${status} is not valid status`,
    });
  }
};

// TODO: delete guest

const DeleteGuestController = async (req, res) => {
  const { guestId } = req.params;

  DeleteGuestService(guestId, res);
};

// TODO: toggle status

const ToggleGuestEventStatusController = async (req, res) => {
  const { status } = req.body;

  const { guestId } = req.params;

  if (statusFields.includes(status)) {
    ToggleGuestEventStatusService(status, guestId, res);
  } else {
    return res.status(400).json({
      message: `${status} is not valid status`,
    });
  }
};

// TODO: guest received

const GuestReceivedController = async (req, res) => {
  const { guestId } = req.params;
  GuestReceivedService(guestId, res);
};

// TODO: allocate room

const AllocationRoomController = async (req, res) => {
  const { guestId } = req.params;

  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["roomNo", "hotel", "checkInDate", "checkOutDate"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { roomNo, hotel, checkInDate, checkOutDate } = req.body;

  RoomAssignService(
    guestId,
    req.event.title,
    {
      roomNo,
      hotel,
      travelStatus: travelStatusObj.roomAssigned,
      checkInDate,
      checkOutDate,
    },
    res
  );
};

// TODO: toggle status

const ToggleGuestTravelStatusController = async (req, res) => {
  const { status } = req.body;

  const { guestId } = req.params;

  if (statusFields.includes(status)) {
    ToggleGuestTravelStatusService(status, guestId, res);
  } else {
    return res.status(400).json({
      message: `${status} is not valid status`,
    });
  }
};

// TODO: edit guest

const AcceptInvitationGuestController = async (req, res) => {
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["name", "email", "phone", "address"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  AcceptInvitationService(req, res);
};

module.exports = {
  CreateGuestController,
  FetchGuestController,
  EditGuestController,
  ToggleGuestEventStatusController,
  ToggleGuestTravelStatusController,
  DeleteGuestController,
  CreateGuestInBulkController,
  AllocationRoomController,
  AcceptInvitationGuestController,
  GuestReceivedController,
};
