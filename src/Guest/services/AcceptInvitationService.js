const { eventStatusObj } = require("../../../constants/statuses");
const { EventModel } = require("../../Event/model/EventModel");
const GuestModel = require("../model/GuestModel");

const AcceptInvitationService = async (req, res) => {
  const { email } = req.body;
  const { eventId } = req.params;
  try {
    const guest = await GuestModel.findOneAndUpdate(
      { email },
      { $set: { ...req.body, eventStatus: eventStatusObj.accept } },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!guest) {
      const event = await EventModel.findById(eventId).populate("guests");
      if (!event) {
        return res.status(404).json({
          message: `${eventId} event is not found.`,
        });
      } else {
        // TODO: prevent the same email to be guest multiple times
        const existingGuest = event.guests.find(
          (guestId) => guestId.email === email
        );

        if (existingGuest) {
          return res.status(400).json({
            message: `${email} is already guest.`,
          });
        } else {
          const newGuest = new GuestModel({
            ...req.body,
            eventStatus: eventStatusObj.accept,
          });
          event.guests.unshift(newGuest._id);

          newGuest.event = event._id;

          const guest = await newGuest.save();

          await event.save();

          return res.status(200).json({
            data: guest,
            new: "new",
          });
        }
      }
    } else {
      return res.status(200).json({
        data: guest,
        old: "old",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { AcceptInvitationService };
