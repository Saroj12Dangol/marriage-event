const moment = require("moment");
const EventModel = require("../src/Event/model/EventModel");

const IsGuestOfEvent = async (req, res, next) => {
  const { eventId, guestId = undefined } = req.params;

  try {
    const event = await EventModel.findById(eventId).populate({
      path: "guests",
      $or: [
        { email: req.body.email }, // Match by email
        { _id: guestId }, // Match by _id (assuming req.body.email contains either email or _id)
      ],
    });

    if (event.guests.length === 0) {
      return res.status(404).json({
        message: `${req.body.email || guestId} is not valid for this event.`,
      });
    }

    if (event.status === "completed" || event.status === "cancelled") {
      return res.status(404).json({
        message: `Invitation you are trying to accept has been completed`,
      });
    }

    req.guest = event.guests[0];
    req.event = event;

    next();
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { IsGuestOfEvent };
