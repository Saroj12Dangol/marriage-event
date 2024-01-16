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

    roomNo: {
      type: String,
    },

    hotel: {
      type: String,
    },

    message: {
      type: String,
    },

    checkInDate: {
      type: Date,
    },

    checkOutDate: {
      type: Date,
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

    numberOfGuest: {
      type: Number,
      default: 1,
    },

    TDCount: {
      type: Number,
      default: 0,
    },

    remarks: {
      type: String,
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
