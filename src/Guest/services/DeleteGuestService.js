const EventModel = require("../../Event/model/EventModel");
const GuestModel = require("../model/GuestModel");

const DeleteGuestService = async (guestId, res) => {
  try {
    const guest = await GuestModel.findById(guestId);
    if (!guest) {
      return res.status(200).json({
        message: `${guest} guest is not found`,
      });
    }
    await GuestModel.deleteOne({ _id: guestId });

    // Remove references from event Model
    await EventModel.updateMany(
      { $or: [{ guests: guestId }] },
      { $pull: { guests: guestId } }
    );

    return res.status(200).json({
      message: `${guestId} guest is deleted`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { DeleteGuestService };
