const {
  IndividualEmailsService,
} = require("../services/IndividualEmailsService");
const { SendEmailService } = require("../services/InvitationToGuestsService");

const SendEmailController = (req, res) => {
  const { travelStatus, eventStatus } = req.query;

  const requiredFields = ["subject", "text", "purpose", "to"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { to, subject, text, purpose } = req.body;

  // Build the query based on the defined eventStatus and travelStatus
  const query = {};
  if (eventStatus !== undefined) {
    query.eventStatus = eventStatus;
  }
  if (travelStatus !== undefined) {
    query.travelStatus = travelStatus;
  }

  SendEmailService({
    to,
    subject,
    text,
    purpose,
    query,
    res,
  });
};

const SendEmailIndividualController = (req, res) => {
  const requiredFields = ["subject", "text", "purpose", "to", "emails"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { to, subject, text, purpose, emails } = req.body;

  IndividualEmailsService({
    to,
    subject,
    text,
    purpose,
    res,
    emails,
  });
};

module.exports = {
  SendEmailController,
  SendEmailIndividualController,
};
