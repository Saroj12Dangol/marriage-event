const EventModel = require("../model/EventModel");

const AddAgencyToEventService = async (agencyId, eventId, res) => {
  try {
    const updatedEvent = await EventModel.findByIdAndUpdate(
      eventId,
      { $set: { agency: agencyId } },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({
        error: `Event ${eventId} not found`,
      });
    }

    return res.status(200).json({
      data: updatedEvent,
    });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = { AddAgencyToEventService };