const moment = require("moment");
const {
  InvitationEmail,
  AskTravelDetail,
  AlertInvitationEmail,
  AlertAskTravelDetail,
  TravelAgency,
  DaysInfo,
} = require("../../../constants/EmailContants");
const {
  invitationTemplate,
} = require("../../../constants/emailTemplates/InvitationTemplate");
const {
  TravelDetailTemplate,
} = require("../../../constants/emailTemplates/TravelDetailTemplate");
const {
  agencyTemplate,
} = require("../../../constants/emailTemplates/agencyTemplate");
const {
  dayInfoTemplate,
} = require("../../../constants/emailTemplates/dayInfoTemplate");
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

      const emails = guests.map((g) => ({
        email: g.email,
        name: g.name,
      }));

      if (emails.length > 0) {
        for (const guest of emails) {
          await SendEmail({
            emails: guest.email,
            template: invitationTemplate(
              purpose === purposeObj.invitation
                ? InvitationEmail.subject
                : AlertInvitationEmail.subject,
              event.title,
              guest.name,
              event.brideName,
              event.groomName
            ),
          });
        }
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
          travelStatus: travelStatusObj.pending,
        },
      });

      if (!event) {
        return res.status(404).json({
          message: `${eventId} event is not found`,
        });
      }

      const guests = event.guests;

      const emails = guests.map((g) => ({
        email: g.email,
        name: g.name,
      }));

      const guestIds = guests.map((g) => g._id);

      const updateCriteria = { _id: { $in: guestIds } };

      const updateOperation = {
        $set: { travelStatus: travelStatusObj.travelDetailAsked },
        $inc: { TDCount: 1 }, // Increment TDcount by 1
      };

      await GuestModel.updateMany(updateCriteria, updateOperation);

      if (emails.length > 0) {
        for (const guest of emails) {
          await SendEmail({
            emails: guest.email,
            template: TravelDetailTemplate(
              AlertAskTravelDetail.subject,
              event.title,
              guest.name,
              event.brideName,
              event.groomName
            ),
          });
        }
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

      const emails = guests.map((g) => ({
        email: g.email,
        name: g.name,
      }));

      const guestIds = guests.map((g) => g._id);

      // return res.json({
      //   emails,
      // });

      daysAndGuests = await GetDaysInfoOfEventService(eventId);

      const days = daysAndGuests.days;

      if (emails.length > 0) {
        for (const guest of emails) {
          await SendEmail({
            subject: DaysInfo.subject,
            emails: guest.email,
            template: dayInfoTemplate(
              DaysInfo.subject,
              days,
              event.title,
              guest.name,
              event.brideName,
              event.groomName
            ),
          });
        }
      }
      return res.status(200).json({
        data: emails,
        // guests: updatedGuest,
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
          template: agencyTemplate(
            TravelAgency.subject,
            TravelAgency.text,
            eventId,
            event.title
          ),
        });

        // const notification = new NotificationModel({
        //   toEmail: emails,
        //   subject: TravelAgency.subject,
        //   body: TravelAgency.text,
        //   purpose,
        //   to: "Agency",
        // });
        // await notification.save();
      }

      // const updateCriteria = { _id: { $in: guestIds } };
      // const updateOperation = {
      // $set: { travelStatus: travelStatusObj.askedToAgent },
      // };

      // await GuestModel.updateMany(updateCriteria, updateOperation);

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
