const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const LoveStoryModel = require("../model/LoveStoryModel");

const EditLoveStoryService = async (loveStoryId, file, body, populateObj, res) => {
  try {
    const updatedLoveStory = await LoveStoryModel.findOneAndUpdate(
      { _id: loveStoryId },
      { $set: body },
      { new: true }
    );

    if (!updatedLoveStory) {
      return res.status(404).json({
        message: `${loveStoryId} not found`,
      });
    }

    if (file) {
      const img = await ImageUploadHandler(file, res);
      const imageResponse = new MediaModel({
        image: img,
      });

      updatedLoveStory.image = imageResponse._id;

      await updatedLoveStory.save();
      await imageResponse.save();
    }

    const day = await LoveStoryModel.findById(loveStoryId).populate(populateObj);

    return res.status(200).json({
      data: day,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { EditLoveStoryService };
