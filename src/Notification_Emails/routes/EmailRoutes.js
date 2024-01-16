const express = require("express");
const {
  SendEmailController,
  FetchNotificationController,
  SendEmailIndividualController,
} = require("../controllers/InvitationToGuestsController");

const EmailRouter = express.Router();

// TODO: send email to guests============
EmailRouter.post("/send-email/:eventId", SendEmailController);
EmailRouter.post(
  "/send-email-selected/:eventId",
  SendEmailIndividualController
);

// =========

// TODO: get notifications controller============
EmailRouter.get("/", FetchNotificationController);

module.exports = { EmailRouter };
