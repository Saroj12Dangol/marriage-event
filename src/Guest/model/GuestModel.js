const mongoose = require("mongoose");
const {
  eventStatusEnum,
  travelStatusEnum,
} = require("../../../constants/enums");

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

    room: {
      type: String,
    },

    hotel: {
      type: String,
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

    travelDetail: {
      type: mongoose.Schema.ObjectId,
      ref: "TravelDetail",
    },

    // event: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Event",
    // },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Guest", GuestSchema);
