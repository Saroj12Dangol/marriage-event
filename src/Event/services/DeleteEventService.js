const CloseFriendsModel = require("../../CloseFriends/model/CloseFriendsModel");
const GuestModel = require("../../Guest/model/GuestModel");
const EventModel = require("../model/EventModel");

const DeleteEventService = async (eventId, res) => {
  try {
    // Find the event by ID
    const event = await EventModel.findById(eventId);

    // If the event does not exist, return a 404 response
    if (!event) {
      return res.status(404).json({ message: `${eventId} event not found` });
    }

    await GuestModel.deleteMany({ _id: { $in: event.guests } });

    await CloseFriendsModel.deleteMany({ _id: { $in: event.closeFriends } });

    await EventModel.updateMany(
      { _id: eventId },
      { $pull: { guests: { $in: event.guests } } },
      { $pull: { closeFriends: { $in: event.closeFriends } } },
      { $pull: { backgrounds: { $in: event.backgrounds } } },
      { $pull: { closeFriends: { $in: event.closeFriends } } }
    );

    await event.save();

    return res.json({
      guests: event,
    });

    // Remove the event, and the pre-remove hook will take care of removing referenced documents

    await EventModel.deleteOne({ _id: eventId });

    // Optionally, you can also call the updateStatusEvent function if needed
    // updateStatusEvent();

    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { DeleteEventService };
