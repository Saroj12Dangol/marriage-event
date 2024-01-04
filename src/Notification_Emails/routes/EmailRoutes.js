const express = require("express");
const {
  SendEmailController,
  FetchNotificationController,
} = require("../controllers/InvitationToGuestsController");

const EmailRouter = express.Router();

// TODO: send email to guests============
EmailRouter.post("/send-email/:eventId", SendEmailController);

// =========

// TODO: get notifications controller============
EmailRouter.get("/", FetchNotificationController);

// // =========

// // TODO: post email  individual controller============
// // EmailRouter.post("/send-email", SendEmailIndividualController);

// // =========

// // TODO: post email of room and event days controller============
// EmailRouter.post(
//   "/send-email/days-information/bulk",
//   SendDaysInfoEmailController
// );

// // TODO: post email of room and event days controller============
// EmailRouter.post(
//   "/send-email/days-information",
//   SendDayInfoEmailIndividualController
// );

module.exports = { EmailRouter };
