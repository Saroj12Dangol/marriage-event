const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const EventModel = require("../model/EventModel");

const EditEventService = async (eventId, req, res) => {
  try {
    const updatedEvent = await EventModel.findOneAndUpdate(
      { _id: eventId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        message: `${eventId} event not found`,
      });
    }

    if (req.files.backgrounds) {
      for (const image of req.files.backgrounds) {
        const img = await ImageUploadHandler(image, res);
        const imageResponse = new MediaModel({
          image: img,
        });

        await imageResponse.save();
        updatedEvent.backgrounds.push(imageResponse._id);
      }
    }

    await updatedEvent.save();

    const event = await EventModel.findById(eventId).populate("backgrounds");

    return res.status(200).json({
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { EditEventService };
