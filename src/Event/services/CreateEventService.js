const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const CoupleModel = require("../../Couple/model/CoupleModel");
const MediaModel = require("../../Media/model/MediaModel");
const EventModel = require("../model/EventModel");

const CreateEventService = async (req, res) => {
  try {
    // TODO: post event in database

    const newEvent = new EventModel({ ...req.body });

    console.log(req.files, "fileds");

    let backgrounds = [];

    for (const image of req.files.backgrounds) {
      const img = await ImageUploadHandler(image, res);
      const imageResponse = new MediaModel({
        image: img,
      });
      imageResponse.save();
      backgrounds.push(imageResponse._id);
    }

    newEvent.backgrounds = backgrounds;
    const event = await newEvent.save();

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
