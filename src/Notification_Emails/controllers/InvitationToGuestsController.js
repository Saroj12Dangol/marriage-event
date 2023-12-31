const { purposeEnum } = require("../../../constants/enums");
const {
  accommodationEmailService,
} = require("../services/AccommodationEmailService");
const {
  accommodationIndividualEmailsService,
} = require("../services/AccomodationIndividualEmail");
const {
  GetDaysInfoOfEventService,
} = require("../services/GetDaysInfoOfEventService");
const {
  IndividualEmailsService,
} = require("../services/IndividualEmailsService");
const { SendEmailService } = require("../services/SendEmailService");

// TODO: email controller

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

  await accommodationEmailService({
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

  await accommodationIndividualEmailsService({
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

const SendEmailController = async (req, res) => {
  const { purpose } = req.body;

  const { eventId } = req.params;

  if (!purposeEnum.includes(purpose)) {
    return res.status(400).json({
      message: `${purpose} is not valid: should be ${purposeEnum}`,
    });
  }
  SendEmailService(purpose, eventId, res);
};

module.exports = {
  SendEmailController,
  SendEmailIndividualController,
  SendDaysInfoEmailController,
  SendDayInfoEmailIndividualController,
};
