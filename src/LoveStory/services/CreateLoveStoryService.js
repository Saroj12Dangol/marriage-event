const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const EventModel = require("../../Event/model/EventModel");
const MediaModel = require("../../Media/model/MediaModel");
const LoveStoryModel = require("../model/LoveStoryModel");

const CreateLoveStoryService = async (req, eventId, file, res) => {
  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: `${eventId} is not found`,
      });
    }

    const loveStory = new LoveStoryModel(req.body);

    const img = await ImageUploadHandler(file, res);
    const imageResponse = new MediaModel({
      image: img,
    });

    loveStory.image = imageResponse._id;

    await loveStory.save();

    await imageResponse.save();

    event.loveStory.push(loveStory._id);

    await event.save();

    return res.status(200).json({
      data: loveStory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { CreateLoveStoryService };
