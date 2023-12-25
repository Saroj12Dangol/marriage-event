const {
  CreateCloseFriendsService,
} = require("../services/CreateCloseFriendsService");

const sideEnum = ["bride", "groom"];

const CreateCloseFriendsController = async (req, res) => {
  const { eventId } = req.params;
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["name", "relation", "side"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  if (!sideEnum.includes(req.body.side)) {
    return res.status(400).json({
      message: `${req.body.side} is invalid: should be ${sideEnum}`,
    });
  }

  // TODO: ==========\ fetch body and files

  if (!req.file) {
    return res.status(400).json({
      message: `Image is required`,
    });
  }

  const { file } = req;

  CreateCloseFriendsService(eventId, req.body, file, res);
};

module.exports = {
  CreateCloseFriendsController,
};
