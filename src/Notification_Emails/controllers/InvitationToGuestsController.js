const {
  AccommodatationEmailService,
} = require("../services/AccommodatationEmailService");
const {
  AccommodatationIndividualEmailsService,
} = require("../services/AccomodatationIndividualEmail");
const {
  GetDaysInfoOfEventService,
} = require("../services/GetDaysInfoOfEventService");
const {
  IndividualEmailsService,
} = require("../services/IndividualEmailsService");
const { SendEmailService } = require("../services/SendBulkEmailService");

const purposeEnum = [
  "invitation",
  "agency",
  "accommodatation",
  "days-information",
];

// TODO: email controller

const SendEmailController = async (req, res) => {
  const { travelStatus, eventStatus } = req.query;

  const requiredFields = ["subject", "text", "purpose", "to", "event"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { to, subject, text, purpose, event } = req.body;

  // TODO: Build the query based on the defined eventStatus and travelStatus
  const query = {};
  if (eventStatus !== undefined) {
    query.eventStatus = eventStatus;
  }
  if (travelStatus !== undefined) {
    query.travelStatus = travelStatus;
  }

  if (!purposeEnum.includes(purpose)) {
    return res.status(400).json({
      message: `${purpose} is not valid: should be ${purposeEnum}`,
    });
  }

  await SendEmailService({
    to,
    subject,
    text,
    purpose,
    query,
    res,
    event,
    query,
  });
};

// TODO:
const SendDaysInfoEmailController = async (req, res) => {
  let daysAndGuests = [];

  const requiredFields = ["subject", "text", "purpose", "to", "event"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { to, subject, text, purpose, event } = req.body;

  // TODO: Build the query based on the defined eventStatus and travelStatus

  if (!purposeEnum.includes(purpose)) {
    return res.status(400).json({
      message: `${purpose} is not valid: should be ${purposeEnum}`,
    });
  }

  daysAndGuests = await GetDaysInfoOfEventService(event, res);

  const days = daysAndGuests.days;
  const guests = daysAndGuests.guests;

  const emails = guests.map((g) => g.email);

  await AccommodatationEmailService({
    subject,
    text,
    purpose,
    res,
    to,
    event,
    emails,
    days,
  });
};

// TODO: send email individually
const SendEmailIndividualController = async (req, res) => {
  const requiredFields = [
    "subject",
    "text",
    "purpose",
    "to",
    "emails",
    "event",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { to, subject, text, purpose, emails, event } = req.body;

  if (!purposeEnum.includes(purpose)) {
    return res.status(400).json({
      message: `${purpose} is not valid: should be ${purposeEnum}`,
    });
  }

  await IndividualEmailsService({
    to,
    subject,
    text,
    purpose,
    res,
    emails,
    event,
  });
};

// TODO:
const SendDayInfoEmailIndividualController = async (req, res) => {
  const requiredFields = [
    "subject",
    "text",
    "purpose",
    "to",
    "emails",
    "event",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  const { to, subject, text, purpose, emails, event } = req.body;

  if (!purposeEnum.includes(purpose)) {
    return res.status(400).json({
      message: `${purpose} is not valid: should be ${purposeEnum}`,
    });
  }

  daysAndGuests = await GetDaysInfoOfEventService(event, res);

  const days = daysAndGuests.days;

  await AccommodatationIndividualEmailsService({
    to,
    subject,
    text,
    purpose,
    res,
    event,
    emails,
    days,
  });
};

module.exports = {
  SendEmailController,
  SendEmailIndividualController,
  SendDaysInfoEmailController,
  SendDayInfoEmailIndividualController,
};
