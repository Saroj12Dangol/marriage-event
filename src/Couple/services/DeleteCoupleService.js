const EventModel = require("../../Event/model/EventModel");
const {
  DeleteImageService,
} = require("../../Media/services/DeleteImageService");
const CoupleModel = require("../model/CoupleModel");

const DeleteCoupleService = async (coupleId, res) => {
  try {
    const couple = await CoupleModel.findById(coupleId);

    if (!couple) {
      return res.status(404).json({
        message: `${coupleId} not found`,
      });
    }

    if (couple.groomImages.length > 0) {
      couple.groomImages.forEach(async (img) => {
        await DeleteImageService(img.toString(), res, false);
      });
    }

    if (couple.brideImages.length > 0) {
      couple.brideImages.forEach(async (img) => {
        await DeleteImageService(img.toString(), res, false);
      });
    }

    await CoupleModel.deleteOne({ _id: coupleId });

    // Remove references from event Model
    await EventModel.updateMany(
      { $or: [{ couple: coupleId }] },
      {
        $unset: {
          couple: "",
        },
      }
    );

    return res.status(200).json({
      message: `${coupleId} is deleted.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { DeleteCoupleService };
