const { travelStatusObj } = require("../../../constants/statuses");
const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const GuestModel = require("../../Guest/model/GuestModel");
const MediaModel = require("../../Media/model/MediaModel");
const TravelDetailModel = require("../model/TravelDetailModel");

const CreateTravelDetailService = async (req, eventId, file, res) => {
  try {
    // TODO: get Guest

    const guest = await GuestModel.findById(req.guest._id);

    const img = await ImageUploadHandler(file, res);
    const imageResponse = new MediaModel({
      image: img,
    });

    await imageResponse.save();

    const travelDetail = new TravelDetailModel(req.body);

    travelDetail.ticketImage = imageResponse._id;

    const savedTravelDetail = await travelDetail.save();

    guest.travelDetail = savedTravelDetail._id;

    // TODO: update travel status
    guest.travelStatus = travelStatusObj.travelDetailReceived;

    await guest.save();

    return res.status(200).json({
      data: savedTravelDetail,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { CreateTravelDetailService };
