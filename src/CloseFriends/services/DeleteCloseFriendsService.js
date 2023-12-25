const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const EventModel = require("../../Event/model/EventModel");
const MediaModel = require("../../Media/model/MediaModel");
const {
  DeleteImageService,
} = require("../../Media/services/DeleteImageService");
const CloseFriendsModel = require("../model/CloseFriendsModel");

const DeleteCloseFriendsService = async (friendId, res) => {
  try {
    const closeFriend = await CloseFriendsModel.findById(friendId);

    if (!closeFriend) {
      return res.status(404).json({
        message: `${friendId} not found`,
      });
    }

    if (closeFriend.image) {
      await DeleteImageService(closeFriend.image.toString(), res, false);
    }

    await CloseFriendsModel.deleteOne({ _id: friendId });

    // Remove references from event Model
    await EventModel.updateMany(
      { $or: [{ closeFriends: friendId }] },
      { $pull: { closeFriends: friendId } }
    );

    return res.status(200).json({
      message: `${friendId} is deleted.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { DeleteCloseFriendsService };
