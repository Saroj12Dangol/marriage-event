const {
  InvitationEmail,
  AskTravelDetail,
  AlertInvitationEmail,
  AlertAskTravelDetail,
  TravelAgency,
} = require("../../../constants/EmailContants");
const {
  purposeObj,
  eventStatusObj,
  travelStatusObj,
} = require("../../../constants/statuses");
const { SendEmail } = require("../../../utils/Email");
const { EventModel } = require("../../Event/model/EventModel");
const GuestModel = require("../../Guest/model/GuestModel");
const NotificationModel = require("../model/NotificationModel");
const { GetDaysInfoOfEventService } = require("./GetDaysInfoOfEventService");

const SendEmailService = async (purpose, eventId, res) => {
  try {
    // TODO: if purpose is invitation
    if (
      purpose === purposeObj.invitation ||
      purpose === purposeObj.alertInvitation
    ) {
      const event = await EventModel.findById(eventId).populate({
        path: "guests",
        match: {
          eventStatus: eventStatusObj.pending,
        },
      });

      if (!event) {
        return res.status(404).json({
          message: `${eventId} event is not found`,
        });
      }

      const guests = event.guests;

      const emails = guests.map((g) => g.email);

      if (emails.length > 0) {
        SendEmail({
          emails,
          subject:
            purpose === "invitation"
              ? InvitationEmail.subject
              : AlertInvitationEmail.subject,
          text:
            purpose === "invitation"
              ? InvitationEmail.text
              : AlertInvitationEmail.text,
          purpose,
          eventId,
          eventTitle: event.title,
        });

        emails.forEach(async (email) => {
          const notification = new NotificationModel({
            toEmail: email,
            subject:
              purpose === "invitation"
                ? InvitationEmail.subject
                : AlertInvitationEmail.subject,
            body:
              purpose === "invitation"
                ? InvitationEmail.text
                : AlertInvitationEmail.text,
            purpose,
            to: "Guest",
          });
          await notification.save();
        });
      }

      return res.status(200).json({
        data: emails,
      });
    }
    // TODO: if purpose is travel detail asking
    else if (
      purpose === purposeObj.askTravelDetail ||
      purpose === purposeObj.alertAskTravelDetail
    ) {
      const event = await EventModel.findById(eventId).populate({
        path: "guests",
        match: {
          eventStatus: eventStatusObj.accept,
        },
      });

      if (!event) {
        return res.status(404).json({
          message: `${eventId} event is not found`,
        });
      }

      const guests = event.guests;

      const emails = guests.map((g) => g.email);

      const guestIds = guests.map((g) => g._id);

      const updateCriteria = { _id: { $in: guestIds } };
      const updateOperation = {
        $set: { travelStatus: travelStatusObj.travelDetailAsked },
      };

      await GuestModel.updateMany(updateCriteria, updateOperation);

      if (emails.length > 0) {
        SendEmail({
          emails,
          subject:
            purpose === purposeObj.askTravelDetail
              ? AskTravelDetail.subject
              : AlertAskTravelDetail.subject,
          text:
            purpose === purposeObj.askTravelDetail
              ? AskTravelDetail.text
              : AlertAskTravelDetail.text,
          purpose,
          eventId,
          eventTitle: event.title,
        });

        emails.forEach(async (email) => {
          const notification = new NotificationModel({
            toEmail: email,
            subject: AskTravelDetail.subject,
            body: AskTravelDetail.text,
            purpose,
            to: "Guest",
          });
          await notification.save();
        });
      }

      return res.status(200).json({
        data: emails,
      });
    }
    // TODO: if purpose is days information
    else if (purpose === purposeObj.daysInformation) {
      const event = await EventModel.findById(eventId).populate({
        path: "guests",
        match: {
          eventStatus: eventStatusObj.accept,
          travelStatus: travelStatusObj.roomAssigned,
        },
      });

      if (!event) {
        return res.status(404).json({
          message: `${eventId} event is not found`,
        });
      }

      const guests = event.guests;

      const emails = guests.map((g) => g.email);

      const guestIds = guests.map((g) => g._id);

      // return res.json({
      //   emails,
      // });

      const updateCriteria = { _id: { $in: guestIds } };
      const updateOperation = {
        $set: { travelStatus: travelStatusObj.daysInformation },
      };

      const updatedGuest = await GuestModel.updateMany(
        updateCriteria,
        updateOperation,
        {
          new: true,
        }
      );

      daysAndGuests = await GetDaysInfoOfEventService(eventId);

      const days = daysAndGuests.days;

      if (emails.length > 0) {
        SendEmail({
          emails,
          subject: AskTravelDetail.subject,
          text: AskTravelDetail.text,
          purpose,
          eventId,
          eventTitle: event.title,
          days,
        });

        emails.forEach(async (email) => {
          const notification = new NotificationModel({
            toEmail: email,
            subject: AskTravelDetail.subject,
            body: AskTravelDetail.text,
            purpose,
            to: "Guest",
          });
          await notification.save();
        });
      }

      return res.status(200).json({
        data: emails,
        guests: updatedGuest,
      });
    }

    // TODO: if purpose is travel agency
    else if (purpose === purposeObj.travelAgency) {
      const event = await EventModel.findById(eventId).populate("agency");

      if (!event) {
        return res.status(404).json({
          message: `${eventId} event is not found`,
        });
      }

      if (!event.agency) {
        return res.status(404).json({
          message: `Travel agency is not assigned to this event ${eventId}`,
        });
      }

      const guests = await GuestModel.find({
        travelStatus: travelStatusObj.travelDetailReceived,
      });

      const guestIds = guests.map((g) => g._id);

      const emails = event.agency.email;

      if (emails) {
        SendEmail({
          emails: [emails],
          subject: TravelAgency.subject,
          text: TravelAgency.text,
          purpose,
          eventId,
          eventTitle: event.title,
        });

        const notification = new NotificationModel({
          toEmail: emails,
          subject: TravelAgency.subject,
          body: TravelAgency.text,
          purpose,
          to: "Agency",
        });
        await notification.save();
      }

      const updateCriteria = { _id: { $in: guestIds } };
      const updateOperation = {
        $set: { travelStatus: travelStatusObj.askedToAgent },
      };

      await GuestModel.updateMany(updateCriteria, updateOperation);

      return res.status(200).json({
        emails,
      });
    } else {
      return res.status(400).json({
        message: "Bad request",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { SendEmailService };
