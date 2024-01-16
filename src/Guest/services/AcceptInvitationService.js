const {
  confirmationTemplate,
} = require("../../../constants/emailTemplates/confirmationTemplate");
const { eventStatusObj } = require("../../../constants/statuses");
const { SendEmail } = require("../../../utils/Email");
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

          await SendEmail({
            emails: email,
            template: confirmationTemplate(
              "Thank you for accepting the invitation.",
              event.title,
              guest.name,
              event.brideName,
              event.groomName
            ),
          });

          return res.status(200).json({
            data: guest,
          });
        }
      }
    } else {
      const event = await EventModel.findById(eventId).populate("guests");
      if (!event) {
        return res.status(404).json({
          message: `${eventId} event is not found.`,
        });
      }
      await SendEmail({
        subject: "Thank you for accepting the invitation.",
        emails: email,
        template: confirmationTemplate(
          "Thank you for accepting the invitation.",
          event.title,
          guest.name,
          event.brideName,
          event.groomName
        ),
      });
      return res.status(200).json({
        data: guest,
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
