const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const CloseFriendsModel = require("../model/CloseFriendsModel");

const EditCloseFrienddsService = async (
  friendId,
  file,
  body,
  populateObj,
  res
) => {
  try {
    const updatedFriend = await CloseFriendsModel.findOneAndUpdate(
      { _id: friendId },
      { $set: body },
      { new: true }
    );

    if (!updatedFriend) {
      return res.status(404).json({
        message: `${friendId} not found`,
      });
    }

    if (file) {
      const img = await ImageUploadHandler(file, res);
      const imageResponse = new MediaModel({
        image: img,
      });

      updatedFriend.image = imageResponse._id;

      await updatedFriend.save();
      await imageResponse.save();
    }

    const closeFriend = await CloseFriendsModel.findById(friendId).populate(
      populateObj
    );

    return res.status(200).json({
      data: closeFriend,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { EditCloseFrienddsService };
