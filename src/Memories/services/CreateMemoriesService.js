const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const MemoriesModel = require("../model/MemoriesModel");

const CreateMemoriesService = async (req, res) => {
  let images = [];

  try {
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

    return res.status(200).json({
      data: newMemories,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { CreateMemoriesService };
