const travelStatusObj = {
  travelDetailAsked: "travel-detail-asked",
  travelDetailReceived: "travel-detail-received",
  askedToAgent: "asked-to-agent",
  received: "received",
  roomAssigned: "roomAssigned",
  daysInformation: "days-information",
  pending: "pending",
};

const purposeObj = {
  invitation: "invitation",
  alertInvitation: "alert-invitation",
  askTravelDetail: "ask-travel-detail",
  alertAskTravelDetail: "alert-ask-travel-detail",
  travelAgency: "travel-agency",
  accommodation: "accommodation", // Note: Corrected the spelling from "accommodation" to "accommodation"
  daysInformation: "days-information",
};

const eventStatusObj = {
  accept: "accept",
  pending: "pending",
};

module.exports = { travelStatusObj, purposeObj, eventStatusObj };
