const mongoose = require("mongoose");

const eventStatusEnum = ["accept", "reject", "pending"];
const travelStatusEnum = ["asked", "received", "accommodation", "pending"];

const GuestSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    email: {
      type: String,
    },

    phone: {
      type: String,
    },

    address: {
      type: String,
    },

    role: {
      type: String,
      default: "guest",
    },

    eventStatus: {
      type: String,
      enum: eventStatusEnum,
      default: "pending",
    },

    travelStatus: {
      type: String,
      enum: travelStatusEnum,
      default: "pending",
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Guest", GuestSchema);
