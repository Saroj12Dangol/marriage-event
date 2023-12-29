const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const { EventModel } = require("../../Event/model/EventModel");
const MediaModel = require("../../Media/model/MediaModel");
const CoupleModel = require("../model/CoupleModel");

const CreateCoupleService = async (data, files, eventId, res) => {
  try {
    // TODO: save to db

    const event = await EventModel.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: `${eventId} event not found`,
      });
    }

    let brideImages = [];
    let groomImages = [];

    for (const image of files.files.brideImages) {
      const img = await ImageUploadHandler(image, res);
      const imageResponse = new MediaModel({
        image: img,
      });

      await imageResponse.save();
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

    const couple = new CoupleModel(data);

    const newCouple = await couple.save();

    newCouple.brideImages = brideImages;
    newCouple.groomImages = groomImages;

    newCouple.event = event._id; //event is added to couple

    await newCouple.save();

    event.couple = newCouple._id; //couple is added to event

    await event.save();

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

module.exports = { CreateCoupleService };
