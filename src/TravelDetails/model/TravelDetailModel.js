const mongoose = require("mongoose");

const TravelDetailSchema = mongoose.Schema(
  {
    ticketImage: {
      type: mongoose.Schema.ObjectId,
      ref: "Media",
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
