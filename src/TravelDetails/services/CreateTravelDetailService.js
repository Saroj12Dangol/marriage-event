const {
  travelDetailReceivedTemplate,
} = require("../../../constants/emailTemplates/travelDetailReceivedTemplate");
const { travelStatusObj } = require("../../../constants/statuses");
const { SendEmail } = require("../../../utils/Email");
const { ImageUploadHandler } = require("../../../utils/ImageUploadHandler");
const { EventModel } = require("../../Event/model/EventModel");
const GuestModel = require("../../Guest/model/GuestModel");
const MediaModel = require("../../Media/model/MediaModel");
const TravelDetailModel = require("../model/TravelDetailModel");

const CreateTravelDetailService = async (req, eventId, file, res) => {
  try {
    const event = await EventModel.findById(eventId);

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

    await SendEmail({
      subject: "Thank you for sending travel detail.",
      emails: req.body.email,
      template: travelDetailReceivedTemplate(
        "Thank you for sending travel detail.",
        event.title,
        guest.name,
        event.brideName,
        event.groomName
      ),
    });

    return res.status(200).json({
      data: savedTravelDetail,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { CreateTravelDetailService };
