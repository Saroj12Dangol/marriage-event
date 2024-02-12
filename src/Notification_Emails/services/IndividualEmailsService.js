const {
  AlertAskTravelDetail,
  DaysInfo,
} = require("../../../constants/EmailContants");
const {
  TravelDetailTemplate,
} = require("../../../constants/emailTemplates/TravelDetailTemplate");
const {
  dayInfoTemplate,
} = require("../../../constants/emailTemplates/dayInfoTemplate");
const { purposeObj, travelStatusObj } = require("../../../constants/statuses");
const { SendEmail } = require("../../../utils/Email");
const { EventModel } = require("../../Event/model/EventModel");
const GuestModel = require("../../Guest/model/GuestModel");
const Notification = require("../model/NotificationModel");

const IndividualEmailsService = async ({ purpose, res, emails, event }) => {
  try {
    const eventDetail = await EventModel.findById(event)
      .populate("days")
      .populate({
        path: "guests",
      });

    if (!eventDetail) {
      return res.status(404).json({
        message: `${event} event is not found`,
      });
    }

    const guests = eventDetail.guests;

    const guestDetails = guests
      .filter((g) => emails.includes(g.email))
      .map((g) => ({
        email: g.email,
        name: g.name,
      }));

    const updateCriteria = { email: { $in: emails } };

    const updateOperation = {
      $set: { travelStatus: travelStatusObj.travelDetailAsked },
      $inc: { TDCount: 1 }, // Increment TDcount by 1
    };

    await GuestModel.updateMany(updateCriteria, updateOperation);

    // TODO: for travel travel detail ask
    if (purpose === purposeObj.alertAskTravelDetail) {
      if (guestDetails.length > 0) {
        for (const guest of guestDetails) {
          await SendEmail({
            emails: guest.email,
            template: TravelDetailTemplate(
              AlertAskTravelDetail.subject,
              eventDetail.title,
              guest.name,
              eventDetail.brideName,
              eventDetail.groomName,
              eventDetail._id
            ),
          });
        }
      }
    } else {
      const days = eventDetail.days;

      if (guestDetails.length > 0) {
        for (const guest of guestDetails) {
          await SendEmail({
            subject: DaysInfo.subject,
            emails: guest.email,
            template: dayInfoTemplate(
              DaysInfo.subject,
              days,
              eventDetail.title,
              guest.name,
              eventDetail.brideName,
              eventDetail.groomName
            ),
          });
        }
      }
    }

    return res.status(200).json({
      data: emails,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { IndividualEmailsService };
