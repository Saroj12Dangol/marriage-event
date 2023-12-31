const { EventModel } = require("../../Event/model/EventModel");
const GuestModel = require("../model/GuestModel");

const CreateGuestService = async (req, eventId, res) => {
  try {
    const event = await EventModel.findById(eventId).populate("guests");

    if (!event) {
      return res.status(404).json({
        message: `${eventId} event is not found.`,
      });
    } else {
      // TODO: prevent the same email to be guest multiple times
      const existingGuest = event.guests.find(
        (guestId) => guestId.email === req.body.email
      );

      if (existingGuest) {
        return res.status(400).json({
          message: `${req.body.email} is already guest.`,
        });
      } else {
        const newGuest = new GuestModel(req.body);
        event.guests.push(newGuest._id);

        newGuest.event = event._id;

        const guest = await newGuest.save();

        await event.save();

        return res.status(200).json({
          data: guest,
        });
      }
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { CreateGuestService };
