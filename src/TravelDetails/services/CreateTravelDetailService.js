const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const EventModel = require("../../Event/model/EventModel");
const GuestModel = require("../../Guest/model/GuestModel");
const MediaModel = require("../../Media/model/MediaModel");
const TravelDetailModel = require("../model/TravelDetailModel");

const CreateTravelDetailService = async (req, eventId, file, res) => {
  try {
    // TODO: get the guestID from email
    const event = await EventModel.findById(eventId).populate({
      path: "guests",
      match: {
        email: req.body.email,
      },
    });

    if (event.guests.length === 0) {
      return res.status(400).json({
        message: `${req.body.email} is not the in the guest list`,
      });
    }

    // TODO: get Guest

    const guestId = event.guests[0]._id;

    const guest = await GuestModel.findById(guestId);

    const img = await ImageUploadHandler(file, res);
    const imageResponse = new MediaModel({
      image: img,
    });

    await imageResponse.save();

    const travelDetail = new TravelDetailModel(req.body);

    guest.travelDetail = travelDetail._id;

    await travelDetail.save();

    await guest.save();

    return res.json({
      event,
      guestId,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { CreateTravelDetailService };
