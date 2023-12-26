const { CreateMemoriesService } = require("../services/CreateMemoriesService");
const { EditMemoryService } = require("../services/EditMemoryService");

const CreateMemoriesController = (req, res) => {
  const { eventId } = req.params;

  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["guest", "day"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  if (!req.files.images) {
    return res.status(400).json({
      message: "Atleast one image is required",
    });
  }

  CreateMemoriesService(eventId, req, res);
};

// TODO: edit day controller
const EditMemoriesController = async (req, res) => {
  const { memoryId } = req.params;

  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }

  EditMemoryService(memoryId, req.files, req.body, populateObj, res);
};

const FetchMemoriesController = () => {};

module.exports = {
  CreateMemoriesController,
  FetchMemoriesController,
  EditMemoriesController,
};
