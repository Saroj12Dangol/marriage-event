const { populateFunctionality } = require("../../../utils/Populate");
const {
  CreateLoveStoryService,
} = require("../services/CreateLoveStoryService");
const {
  DeleteLoveStoryService,
} = require("../services/DeleteLoveStoryService");
const { EditLoveStoryService } = require("../services/EditLoveStoryService");

const CreateLoveStoryController = (req, res) => {
  const { eventId } = req.params;

  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["title", "description", "dateTime"];

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

  CreateLoveStoryService(req, eventId, file, res);
};

const EditLoveStoryController = async (req, res) => {
  const { loveStoryId } = req.params;

  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }

  EditLoveStoryService(loveStoryId, req.file, req.body, populateObj, res);
};

const DeleteLoveStoryController = async (req, res) => {
  const { loveStoryId } = req.params;

  DeleteLoveStoryService(loveStoryId, res);
};

module.exports = {
  CreateLoveStoryController,
  EditLoveStoryController,
  DeleteLoveStoryController,
};
