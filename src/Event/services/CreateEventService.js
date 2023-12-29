const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const MediaModel = require("../../Media/model/MediaModel");
const { EventModel } = require("../model/EventModel");

const CreateEventService = async (req, res) => {
  try {
    // TODO: post event in the database

    let backgrounds = [];

    for (const image of req.files.backgrounds) {
      const img = await ImageUploadHandler(image, res);

      const imageResponse = new MediaModel({
        image: img,
      });
      await imageResponse.save();
      backgrounds.push(imageResponse._id);
    }

    const newEvent = new EventModel({ ...req.body });

    newEvent.backgrounds = backgrounds;

    const event = await newEvent.save();

    // Move the response sending outside the loop
    return res.status(200).json({
      data: event,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { CreateEventService };
