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

module.exports = { EmailRouter };
