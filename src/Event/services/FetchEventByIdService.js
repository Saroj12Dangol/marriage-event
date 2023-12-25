const EventModel = require("../model/EventModel");

const FetchEventByIdService = async (eventId, res, populateObj) => {
  try {
    const event = await EventModel.findById(eventId).populate(populateObj);

    if (!event) {
      return res.status(404).json({
        message: `${eventId} is not found.`,
      });
    } else {
      return res.status(200).json({
        data: event,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { FetchEventByIdService };
