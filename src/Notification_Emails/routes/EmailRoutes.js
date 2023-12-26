const express = require("express");
const {
  SendEmailController,
  SendEmailIndividualController,
  SendAccommodatationEmailController,
  SendAccommodatationEmailIndividualController,
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
  "/send-email/accommodatation/bulk",
  SendAccommodatationEmailController
);


// TODO: post email of room and event days controller============
EmailRouter.post(
  "/send-email/accommodatation",
  SendAccommodatationEmailIndividualController
);

// =========

module.exports = { EmailRouter };
