const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const DaysModel = require("../model/DaysModel");

const EditDaysService = async (dayId, file, body, populateObj, res) => {
  try {
    const updatedDay = await DaysModel.findOneAndUpdate(
      { _id: dayId },
      { $set: body },
      { new: true }
    );

    if (!updatedDay) {
      return res.status(404).json({
        message: `${dayId} not found`,
      });
    }

    if (file) {
      const img = await ImageUploadHandler(file, res);
      const imageResponse = new MediaModel({
        image: img,
      });

      updatedDay.image = imageResponse._id;

      await updatedDay.save();
      await imageResponse.save();
    }

    const day = await DaysModel.findById(dayId).populate(populateObj);

    return res.status(200).json({
      data: day,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { EditDaysService };
