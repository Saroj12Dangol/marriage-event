const AgencyModel = require("../../Agency/model/AgencyModel");
const DaysModel = require("../../Days/model/DaysModel");
const GuestModel = require("../../Guest/model/GuestModel");
const MediaModel = require("../../Media/model/MediaModel");
const MemoriesModel = require("../../Memories/model/MemoriesModel");
const { EventModel } = require("../model/EventModel");

const DeleteEventService = async (eventId, res) => {
  try {
    // Find the event by ID
    const event = await EventModel.findById(eventId).populate([
      {
        path: "memories",
        populate: {
          path: "images",
        },
      },
      {
        path: "days",
        populate: {
          path: "image",
        },
      },
      {
        path: "backgrounds",
      },
    ]);

    // If the event does not exist, return a 404 response
    if (!event) {
      return res.status(404).json({ message: `${eventId} event not found` });
    }

    const backgroundImagesIds = event.backgrounds
      .map((img) => (img ? img._id : null))
      .filter((id) => id !== null);

    const daysImagesIds = event.days
      .map((img) => img && img.image && img.image._id)
      .filter((id) => id !== null);

    const memoryImageIds = event.memories
      .map((memory) => memory.images.map((image) => (image ? image._id : null)))
      .flat()
      .filter((id) => id !== null);

    const imageIds = [
      ...backgroundImagesIds,
      ...daysImagesIds,
      ...memoryImageIds,
    ];

    const imagesDeleted = await MediaModel.deleteMany({
      _id: { $in: imageIds },
    });

    const geustDeleted = await GuestModel.deleteMany({
      _id: { $in: event.guests },
    });

    // await CloseFriendsModel.deleteMany({ _id: { $in: event.closeFriends } });

    // await LoveStoryModel.deleteMany({ _id: { $in: event.loveStory } });

    const memoriesDeleted = await MemoriesModel.deleteMany({
      _id: { $in: event.memories },
    });

    const daysDeletedd = await DaysModel.deleteMany({
      _id: { $in: event.days },
    });

    const eventDeleted = await EventModel.deleteOne({ _id: eventId });

    // Remove references from event Model
    await AgencyModel.updateMany(
      { $or: [{ event: eventId }] },
      {
        $unset: {
          event: "",
        },
      }
    );

    return res.status(200).json({
      message: "Event deleted successfully",
      imagesDeleted,
      daysDeletedd,
      geustDeleted,
      memoriesDeleted,
      eventDeleted,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { DeleteEventService };
