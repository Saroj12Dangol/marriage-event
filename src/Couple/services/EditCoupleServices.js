const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const CoupleModel = require("../model/CoupleModel");

const EditCoupleService = async (coupleId, req, res) => {
  try {
    const updatedCouple = await CoupleModel.findOneAndUpdate(
      { _id: coupleId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedCouple) {
      return res.status(404).json({
        message: `${coupleId} not found`,
      });
    }

    if (req.files.brideImages) {
      for (const image of req.files.brideImages) {
        const img = await ImageUploadHandler(image, res);
        const imageResponse = new MediaModel({
          image: img,
        });

        await imageResponse.save();
        updatedCouple.brideImages.push(imageResponse._id);
      }
    }

    if (req.files.groomImages) {
      for (const image of req.files.groomImages) {
        const img = await ImageUploadHandler(image, res);
        const imageResponse = new MediaModel({
          image: img,
        });
        imageResponse.save();
        updatedCouple.groomImages.push(imageResponse._id);
      }
    }

    await updatedCouple.save();

    const couple = await CoupleModel.findById(coupleId)
      .populate("groomImages")
      .populate("brideImages");

    return res.status(200).json({
      data: couple,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { EditCoupleService };
