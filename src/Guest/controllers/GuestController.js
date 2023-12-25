const { CreateGuestService } = require("../services/CreateGuestService");
const { DeleteGuestService } = require("../services/DeleteGuestService");
const { EditGuestService } = require("../services/EditGuestService");
const { FetchGuestService } = require("../services/FetchGuestService");
const {
  ToggleGuestEventStatusService,
  ToggleGuestTravelStatusService,
} = require("../services/ToggleGuestStatusService");

const statusFields = ["accept", "reject", "pending"];

const CreateGuestController = async (req, res) => {
  const { eventId } = req.params;
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["name", "email", "phone", "address"];

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

// TODO: fetch guest

const FetchGuestController = async (req, res) => {
  FetchGuestService(res);
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

module.exports = {
  CreateGuestController,
  FetchGuestController,
  EditGuestController,
  ToggleGuestEventStatusController,
  ToggleGuestTravelStatusController,
  DeleteGuestController,
};
