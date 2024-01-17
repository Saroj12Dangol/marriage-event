const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const TravelDetailModel = require("../model/TravelDetailModel");

const UpdateTravelDetailService = async (travelId, file, body, res) => {
  try {
    const updatedTravelDetail = await TravelDetailModel.findOneAndUpdate(
      { _id: travelId },
      { $set: body },
      { new: true }
    );

    if (!updatedTravelDetail) {
      return res.status(404).json({
        message: `${travelId} not found`,
      });
    }

    if (file) {
      const img = await ImageUploadHandler(file, res);
      const imageResponse = new MediaModel({
        image: img,
      });

      updatedTravelDetail.ticketImage = imageResponse._id;

      await updatedTravelDetail.save();
      await imageResponse.save();
    }

    const travelDetail = await TravelDetailModel.findById(travelId);

    return res.status(200).json({
      data: travelDetail,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { UpdateTravelDetailService };
