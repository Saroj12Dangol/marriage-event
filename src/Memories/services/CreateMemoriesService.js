const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const { EventModel } = require("../../Event/model/EventModel");
const MediaModel = require("../../Media/model/MediaModel");
const MemoriesModel = require("../model/MemoriesModel");

const CreateMemoriesService = async (eventId, req, res) => {
  // TODO: if a guest added memories multiple times for same day, only the images are added not a memory created again
  // TODO: but if a guest added memories for different day then separate memory is created
  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: `${eventId} is not found`,
      });
    }

    const memory = await MemoriesModel.find({
      day: req.body.day,
      guest: req.guest._id,
    });

    let images = [];

    for (const image of req.files.images) {
      const img = await ImageUploadHandler(image, res);
      const imageResponse = new MediaModel({
        image: img,
      });
      await imageResponse.save();
      images.push(imageResponse._id);
    }

    if (memory.length > 0) {
      memory[0].images.push([...images]);
      const updatedMemory = await memory[0].save();

      return res.status(200).json({
        data: updatedMemory,
      });
    }

    const memories = new MemoriesModel({
      guest: req.guest._id,
      event: eventId,
      day: req.body.day,
    });

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
