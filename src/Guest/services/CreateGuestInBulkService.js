const { EventModel } = require("../../Event/model/EventModel");
const GuestModel = require("../model/GuestModel");

const CreateGuestInBulkService = async (req, eventId, res) => {
  try {
    const event = await EventModel.findById(eventId).populate("guests");

    if (!event) {
      return res.status(404).json({
        message: `${eventId} event is not found.`,
      });
    } else {
      // TODO: prevent the same email to be guest multiple times

      const existingEmails = new Set(event.guests.map((guest) => guest.email));
      const duplicates = [];

      for (const guestData of req.body) {
        if (existingEmails.has(guestData.email)) {
          duplicates.push(guestData.email);
        } else {
          const newGuest = new GuestModel(guestData);
          const guest = await newGuest.save();
          event.guests.push(guest._id);
        }
      }
      
      if (duplicates.length > 0) {
        return res.status(400).json({
          message: `${duplicates.join(", ")} already exist as guests.`,
        });
      } else {
        await event.save();

        return res.status(200).json({
          message: "Guests added successfully.",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { CreateGuestInBulkService };
