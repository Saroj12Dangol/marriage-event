const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const { EventModel } = require("../../Event/model/EventModel");
const MediaModel = require("../../Media/model/MediaModel");
const CloseFriendsModel = require("../model/CloseFriendsModel");

const CreateCloseFriendsService = async (eventId, body, file, res) => {
  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: `${eventId} event not found`,
      });
    }

    // const img = await ImageUploadHandler(file, res);
    // const imageResponse = new MediaModel({
    //   image: img,
    // });

    // await imageResponse.save();

    const closeFriend = new CloseFriendsModel({ ...body });

    // closeFriend.image = imageResponse._id;

    await closeFriend.save();

    event.closeFriends.push(closeFriend._id);

    await event.save();

    return res.status(200).json({
      data: closeFriend,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { CreateCloseFriendsService };
