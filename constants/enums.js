const eventStatusEnum = ["accept", "pending"];

const travelStatusEnum = [
  "travel-detail-asked",
  "travel-detail-received",
  "asked-to-agent",
  "received",
  "roomAssigned",
  "days-information",
  "pending",
];

const statusEnum = ["completed", "ongoing", "upcoming", "cancelled"];

const purposeEnum = [
  "invitation",
  "alert-invitation",
  "ask-travel-detail",
  "alert-ask-travel-detail",
  "travel-agency",
  "accommodatation",
  "days-information",
];

module.exports = { eventStatusEnum, travelStatusEnum, statusEnum, purposeEnum };
