const EventModel = require("../../Event/model/EventModel");
const {
  DeleteImageService,
} = require("../../Media/services/DeleteImageService");
const MemoriesModel = require("../model/MemoriesModel");

const DeleteMemoryService = async (memoryId, res) => {
  try {
    const memory = await MemoriesModel.findById(memoryId);

    if (!memory) {
      return res.status(404).json({
        message: `${memoryId} not found`,
      });
    }

    if (memory.images.length) {
      for (image of memory.images) {
        await DeleteImageService(image.toString(), res, false);
      }
    }

    await MemoriesModel.deleteOne({ _id: memoryId });

    // Remove references from event Model
    await EventModel.updateMany(
      { $or: [{ memories: memoryId }] },
      { $pull: { memories: memoryId } }
    );

    return res.status(200).json({
      message: `${memoryId} is deleted.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { DeleteMemoryService };
