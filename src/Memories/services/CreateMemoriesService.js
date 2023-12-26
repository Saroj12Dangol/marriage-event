const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const EventModel = require("../../Event/model/EventModel");
const MediaModel = require("../../Media/model/MediaModel");
const MemoriesModel = require("../model/MemoriesModel");

const CreateMemoriesService = async (eventId, req, res) => {
  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: `${eventId} is not found`,
      });
    }

    let images = [];

    for (const image of req.files.images) {
      const img = await ImageUploadHandler(image, res);
      const imageResponse = new MediaModel({
        image: img,
      });
      imageResponse.save();
      images.push(imageResponse._id);
    }

    const memories = new MemoriesModel(req.body);

    memories.images = images;

    const newMemories = await memories.save();

    event.memories.push(newMemories._id);

    await event.save();

    return res.status(200).json({
      data: newMemories,
    });
  } catch (error) {
    return res.status(400).json({
      data: error.message,
    });
  }
};

module.exports = { CreateMemoriesService };
