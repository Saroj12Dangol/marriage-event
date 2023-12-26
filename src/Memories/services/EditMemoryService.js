const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const MemoriesModel = require("../model/MemoriesModel");

const EditMemoryService = async (memoryId, files, body, populateObj, res) => {
  console.log(files, "filesss");
  try {
    const updatedMemories = await MemoriesModel.findOneAndUpdate(
      { _id: memoryId },
      { $set: body },
      { new: true }
    );

    if (!updatedMemories) {
      return res.status(404).json({
        message: `${memoryId} not found`,
      });
    }

    if (files.images) {
      for (image of files.images) {
        const img = await ImageUploadHandler(image, res);
        const imageResponse = new MediaModel({
          image: img,
        });

        updatedMemories.images.push(imageResponse._id);

        await updatedMemories.save();
        await imageResponse.save();
      }
    }

    const memory = await MemoriesModel.findById(memoryId).populate(populateObj);

    return res.status(200).json({
      data: memory,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { EditMemoryService };
