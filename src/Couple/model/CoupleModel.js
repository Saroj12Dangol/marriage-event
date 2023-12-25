const mongoose = require("mongoose");

const CoupleSchema = mongoose.Schema(
  {
    brideName: {
      type: String,
    },

    groomName: {
      type: String,
    },

    brideAge: {
      type: Number,
    },

    groomAge: {
      type: Number,
    },

    brideImages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],

    groomImages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],

    groomFB: {
      type: String,
    },

    groomInsta: {
      type: String,
    },

    brideFB: {
      type: String,
    },

    brideInsta: {
      type: String,
    },

    groomAddress: {
      type: String,
    },

    brideAddress: {
      type: String,
    },

    groomPhone: {
      type: String,
    },

    bridePhone: {
      type: String,
    },

    groomEmail: {
      type: String,
    },

    brideEmail: {
      type: String,
    },

    event: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Couple", CoupleSchema);
