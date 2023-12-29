const { EventModel } = require("../../../Event/model/EventModel");

const GetDaysInfoOfEventService = async (eventId) => {
  try {
    const event = await EventModel.findById(eventId)
      .populate("days")
      .populate({
        path: "guests",
        match: {
          travelStatus: "received",
        },
      })
      .select("days guests");

    if (!event) {
      return res.status(404).json({
        message: `${eventId} is not found.`,
      });
    } else {
      return event;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { GetDaysInfoOfEventService };
