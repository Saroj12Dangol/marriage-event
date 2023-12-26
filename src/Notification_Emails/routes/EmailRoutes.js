const express = require("express");
const {
  SendEmailController,
  SendEmailIndividualController,
} = require("../controllers/InvitationToGuestsController");

const EmailRouter = express.Router();

// TODO: post team controller============
EmailRouter.post("/send-email/bulk", SendEmailController);

// =========

// TODO: post team controller============
EmailRouter.post("/send-email", SendEmailIndividualController);

// =========

module.exports = { EmailRouter };
