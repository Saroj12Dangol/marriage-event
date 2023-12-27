const {
  CreateAgencyServiceFromEventService,
} = require("../services/CreateAgencyFromEventService");
const { CreateAgencyService } = require("../services/CreateAgencyService");
const { DeleteAgencyService } = require("../services/DeleteAgencyService");
const { EditAgencyService } = require("../services/EditAgencyService");
const {
  FetchAgencyByIdService,
} = require("../services/FetchAgencyByIdService");
const { fetchAgencyService } = require("../services/FetchAgencyService");

const createAgencyFronEventController = async (req, res) => {
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

  CreateAgencyServiceFromEventService(req, eventId, res);
};

const createAgencyController = async (req, res) => {
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

  CreateAgencyService(req, res);
};

// TODO: agency edit controller

const fetchAgencyController = async (req, res) => {
  fetchAgencyService(req, res);
};

// TODO: ==============

// TODO: agency edit controller

const EditAgencyController = async (req, res) => {
  const { agencyId } = req.params;
  EditAgencyService(agencyId, req, res);
};

// TODO: ==============

// TODO: agency edit controller

const DeleteAgencyController = async (req, res) => {
  const { agencyId } = req.params;
  DeleteAgencyService(agencyId, res);
};

// TODO: ==============

// TODO: ==============

const FetchAgencyByIdController = async (req, res) => {
  const { agencyId } = req.params;

  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }
  FetchAgencyByIdService(agencyId, res, populateObj);
};

// TODO: ==============

module.exports = {
  createAgencyFronEventController,
  fetchAgencyController,
  EditAgencyController,
  DeleteAgencyController,
  createAgencyController,
  FetchAgencyByIdController,
};
