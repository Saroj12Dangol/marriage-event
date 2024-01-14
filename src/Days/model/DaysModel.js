const mongoose = require("mongoose");

const DaysSchema = mongoose.Schema(
  {
    image: {
      type: mongoose.Schema.ObjectId,
      ref: "Media",
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },

    dressCode: {
      type: String,
    },

    theme: {
      type: String,
    },

    area: {
      type: String,
    },

    location: {
      type: String,
    },

    dateTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Days", DaysSchema);
