const EventModel = require("../model/EventModel");

const FetchEventService = async (req, res, populateObj) => {
  try {
    // TODO: post event in database

    try {
      const event = await EventModel.find({}).populate(populateObj);

      return res.status(200).json({
        data: event,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { FetchEventService };
