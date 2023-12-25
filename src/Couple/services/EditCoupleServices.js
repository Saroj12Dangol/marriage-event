const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const CoupleModel = require("../model/CoupleModel");

const EditCoupleService = async (data, files, req, res, next) => {
  try {
    // TODO: save to db

    const couple = new CoupleModel(data);

    const newCouple = await couple.save();

    let brideImages = [];
    let groomImages = [];

    for (const image of files.files.brideImages) {
      const img = await ImageUploadHandler(image, res);
      const imageResponse = new MediaModel({
        image: img,
      });
      imageResponse.save();
      brideImages.push(imageResponse._id);
    }

    for (const image of files.files.groomImages) {
      const img = await ImageUploadHandler(image, res);
      const imageResponse = new MediaModel({
        image: img,
      });
      imageResponse.save();
      groomImages.push(imageResponse._id);
    }

    newCouple.brideImages = brideImages;
    newCouple.groomImages = groomImages;

    await newCouple.save();

    const populatedCouple = await CoupleModel.findById(newCouple._id)
      .populate("brideImages")
      .populate("groomImages");
    return res.status(200).json({
      data: populatedCouple,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { EditCoupleService };
