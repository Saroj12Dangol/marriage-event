const CloseFriendsModel = require("../../CloseFriends/model/CloseFriendsModel");
const DaysModel = require("../../Days/model/DaysModel");
const GuestModel = require("../../Guest/model/GuestModel");
const LoveStoryModel = require("../../LoveStory/model/LoveStoryModel");
const {
  DeleteImageService,
} = require("../../Media/services/DeleteImageService");
const MemoriesModel = require("../../Memories/model/MemoriesModel");
const EventModel = require("../model/EventModel");

const DeleteEventService = async (eventId, res) => {
  try {
    // Find the event by ID
    const event = await EventModel.findById(eventId);

    // If the event does not exist, return a 404 response
    if (!event) {
      return res.status(404).json({ message: `${eventId} event not found` });
    }

    if (event.memories.length) {
      for (image of memory.images) {
        await DeleteImageService(image.toString(), res, false);
      }
    }

    await GuestModel.deleteMany({ _id: { $in: event.guests } });

    await CloseFriendsModel.deleteMany({ _id: { $in: event.closeFriends } });

    await LoveStoryModel.deleteMany({ _id: { $in: event.loveStory } });

    await MemoriesModel.deleteMany({ _id: { $in: event.memories } });

    await DaysModel.deleteMany({ _id: { $in: event.days } });

    // await EventModel.updateMany(
    //   { _id: eventId },
    //   {
    //     $pull: {
    //       guests: { $in: event.guests },
    //       closeFriends: { $in: event.closeFriends },
    //       backgrounds: { $in: event.backgrounds },
    //       days: { $in: event.days },
    //       memories: { $in: event.memories },
    //       loveStory: { $in: event.loveStory },
    //     },
    //   }
    // );

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
