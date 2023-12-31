const { EventModel } = require("../src/Event/model/EventModel");

const IsGuestOfEvent = async (req, res, next) => {
  const { eventId, guestId = undefined } = req.params; //guestId for room allocation
  const { email } = req.body;

  if (!guestId && !email) {
    return res.status(400).json({
      message: "Email is required",
    });
  }

  const matchConditions = {};

  if (email) {
    matchConditions.email = email;
  } else if (guestId) {
    matchConditions.guestId = guestId;
  }

  try {
    const event = await EventModel.findById(eventId).populate({
      path: "guests",
      match: matchConditions,
    });

    console.log(event?.guests, "guests");
    if (event.guests.length === 0) {
      return res.status(400).json({
        success: false,
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
      success: false,
      message: error.message,
    });
  }
};

module.exports = { IsGuestOfEvent };
