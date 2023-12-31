const { ChangePwAgencyService } = require("../services/ChangePwAgency.service");
const {
  CreateAgencyServiceFromEventService,
} = require("../services/CreateAgencyFromEvent.service");
const { CreateAgencyService } = require("../services/CreateAgency.service");
const { DeleteAgencyService } = require("../services/DeleteAgency.service");
const { EditAgencyService } = require("../services/EditAgency.service");
const {
  FetchAgencyByIdService,
} = require("../services/FetchAgencyById.service");
const { fetchAgencyService } = require("../services/FetchAgency.service");
const { LoginAgencyService } = require("../services/LoginAgency.service");

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

// TODO: login agency
const LoginAgencyController = async (req, res) => {
  const requiredFields = ["email", "password"];

  const { email, password } = req.body;

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  // TODO: =================
  LoginAgencyService(email, password, res);
};

const createAgencyController = async (req, res) => {
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["name", "email", "phone", "address", "password"];

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

// TODO: change pw of agency  controller

const ChangePwAgencyController = async (req, res) => {
  const { agencyId } = req.params;
  const { newPassword, oldPassword } = req.body;

  const requiredFields = ["newPassword", "oldPassword"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  ChangePwAgencyService(agencyId, newPassword, oldPassword, res);
};

module.exports = {
  createAgencyFronEventController,
  fetchAgencyController,
  EditAgencyController,
  DeleteAgencyController,
  createAgencyController,
  FetchAgencyByIdController,
  ChangePwAgencyController,
  LoginAgencyController,
};
