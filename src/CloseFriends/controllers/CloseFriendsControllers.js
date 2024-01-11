const {
  CreateCloseFriendsService,
} = require("../services/CreateCloseFriendsService");
const {
  DeleteCloseFriendsService,
} = require("../services/DeleteCloseFriendsService");
const {
  EditCloseFrienddsService,
} = require("../services/EditCloseFriendsService");

const CreateCloseFriendsController = async (req, res) => {
  const { eventId } = req.params;
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["name", "relation"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missingFields.join(", ")}`,
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

// TODO: edit close friends controller
const EditCloseFriendController = async (req, res) => {
  const { friendId } = req.params;

  let populateObj = [];
  if (req.query.populate) {
    populateObj = await populateFunctionality(req.query.populate);
  }

  EditCloseFrienddsService(friendId, req.file, req.body, populateObj, res);
};

// TODO: delete friend

const DeleteCloseFriendsController = async (req, res) => {
  const { friendId } = req.params;

  DeleteCloseFriendsService(friendId, res);
};

module.exports = {
  CreateCloseFriendsController,
  EditCloseFriendController,
  DeleteCloseFriendsController,
};
