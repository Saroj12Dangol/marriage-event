const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const EventModel = require("../../Event/model/EventModel");
const MediaModel = require("../../Media/model/MediaModel");
const DaysModel = require("../model/DaysModel");

const CreateDaysService = async (req, eventId, file, res) => {
  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: `${eventId} is not found`,
      });
    }

    const day = new DaysModel(req.body);

    const img = await ImageUploadHandler(file, res);
    const imageResponse = new MediaModel({
      image: img,
    });

    day.image = imageResponse._id;

    await day.save();

    await imageResponse.save();

    event.days.push(day._id);

    await event.save();

    return res.status(200).json({
      data: day,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { CreateDaysService };
