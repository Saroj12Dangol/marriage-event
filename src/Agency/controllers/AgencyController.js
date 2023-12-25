const { CreateAgencyService } = require("../services/CreateAgencyService");
const { DeleteAgencyService } = require("../services/DeleteAgencyService");
const { EditAgencyService } = require("../services/EditAgencyService");
const { fetchAgencyService } = require("../services/FetchAgencyService");

const createAgencyController = async (req, res) => {
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

  CreateAgencyService(req, eventId, res);
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

module.exports = {
  createAgencyController,
  fetchAgencyController,
  EditAgencyController,
  DeleteAgencyController,
};
