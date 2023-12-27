const express = require("express");
const {
  SendEmailController,
  SendEmailIndividualController,
  SendDaysInfoEmailController,
  SendDayInfoEmailIndividualController,
} = require("../controllers/InvitationToGuestsController");

const EmailRouter = express.Router();

// TODO: post email in bulk controller============
EmailRouter.post("/send-email/bulk", SendEmailController);

// =========

// TODO: post email  individual controller============
EmailRouter.post("/send-email", SendEmailIndividualController);

// =========

// TODO: post email of room and event days controller============
EmailRouter.post(
  "/send-email/days-information/bulk",
  SendDaysInfoEmailController
);

// TODO: post email of room and event days controller============
EmailRouter.post(
  "/send-email/days-information",
  SendDayInfoEmailIndividualController
);

// TODO: send email to guests============
EmailRouter.post(
  "/send-email/days-information",
  SendDayInfoEmailIndividualController
);

// =========

module.exports = { EmailRouter };
