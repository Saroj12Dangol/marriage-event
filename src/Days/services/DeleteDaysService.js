const { EventModel } = require("../../Event/model/EventModel");
const {
  DeleteImageService,
} = require("../../Media/services/DeleteImageService");
const DaysModel = require("../model/DaysModel");

const DeleteDaysService = async (dayId, res) => {
  try {
    const day = await DaysModel.findById(dayId);

    if (!day) {
      return res.status(404).json({
        message: `${dayId} not found`,
      });
    }

    if (day.image) {
      await DeleteImageService(day.image.toString(), res, false);
    }

    await DaysModel.deleteOne({ _id: dayId });

    // Remove references from event Model
    await EventModel.updateMany(
      { $or: [{ days: dayId }] },
      { $pull: { days: dayId } }
    );

    return res.status(200).json({
      message: `${dayId} is deleted.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { DeleteDaysService };
