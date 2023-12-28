const mongoose = require("mongoose");

const TravelDetailSchema = mongoose.Schema(
  {
    ticketImage: {
      type: mongoose.Schema.ObjectId,
      ref: "Media",
    },

    airline: {
      type: String,
    },

    flightNumber: {
      type: String,
    },

    arrivalDateTime: {
      type: Date,
    },

    departureDateTime: {
      type: Date,
    },

    arrivalPlace: {
      type: String,
    },

    email: {
      type: String,
    },

    guest: {
      type: mongoose.Schema.ObjectId,
      ref: "Guest",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TravelDetail", TravelDetailSchema);
