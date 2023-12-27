const mongoose = require("mongoose");

const forEnum = ["guest", "agency", "admin"];
const purposeEnum = [
  "invitation",
  "travel-detail",
  "accommodatation",
  "days-information",
];

const NotificationSchema = mongoose.Schema(
  {
    to: {
      type: String,
      enum: forEnum,
    },

    toEmail: {
      type: String,
    },

    fromEmail: {
      type: String,
    },

    subject: {
      type: String,
    },

    body: {
      type: String,
    },

    purpose: {
      type: String,
      enum: purposeEnum,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", NotificationSchema);
