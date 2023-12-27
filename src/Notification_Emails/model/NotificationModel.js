const mongoose = require("mongoose");
const { purposeEnum, forEnum } = require("../../../constants/enums");

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
