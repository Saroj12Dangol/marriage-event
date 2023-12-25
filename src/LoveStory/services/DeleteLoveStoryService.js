const EventModel = require("../../Event/model/EventModel");
const {
  DeleteImageService,
} = require("../../Media/services/DeleteImageService");
const LoveStoryModel = require("../model/LoveStoryModel");

const DeleteLoveStoryService = async (loveStoryId, res) => {
  try {
    const loveStory = await LoveStoryModel.findById(loveStoryId);

    if (!loveStory) {
      return res.status(404).json({
        message: `${loveStoryId} not found`,
      });
    }

    if (loveStory.image) {
      await DeleteImageService(loveStory.image.toString(), res, false);
    }

    await LoveStoryModel.deleteOne({ _id: loveStoryId });

    // Remove references from event Model
    await EventModel.updateMany(
      { $or: [{ loveStory: loveStoryId }] },
      { $pull: { loveStory: loveStoryId } }
    );

    return res.status(200).json({
      message: `${loveStoryId} is deleted.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { DeleteLoveStoryService };
