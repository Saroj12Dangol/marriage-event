const express = require("express");
const {
  SendEmailController,
} = require("../controllers/InvitationToGuestsController");

const EmailRouter = express.Router();

// TODO: post team controller============
EmailRouter.post("/send-email/bulk", SendEmailController);

// =========

module.exports = { EmailRouter };
