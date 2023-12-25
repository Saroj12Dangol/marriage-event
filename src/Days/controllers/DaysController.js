const { populateFunctionality } = require("../../../utils/Populate");
const { CreateDaysService } = require("../services/CreateDaysService");
const { DeleteDaysService } = require("../services/DeleteDaysService");
const { EditDaysService } = require("../services/EditDaysService");

const CreateDaysController = (req, res) => {
  const { eventId } = req.params;

  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["title", "description", "location", "dateTime"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  //   TODO: work

  if (!req.file) {
    return res.status(400).json({
      message: `Image is required`,
    });
  }

  const { file } = req;

  CreateDaysService(req, eventId, file, res);
};

const EditDaysController = async (req, res) => {
  const { dayId } = req.params;

  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }

  EditDaysService(dayId, req.file, req.body, populateObj, res);
};

const DeleteDaysController = async (req, res) => {
  const { dayId } = req.params;

  DeleteDaysService(dayId, res);
};

module.exports = {
  CreateDaysController,
  EditDaysController,
  DeleteDaysController,
};
