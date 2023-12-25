const mongoose = require("mongoose");

const sideEnum = ["bride", "groom"];
const CloseFriendsSchema = mongoose.Schema(
  {
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },

    name: {
      type: String,
    },

    relation: {
      type: String,
    },

    fbLink: {
      type: String,
    },

    instaLink: {
      type: String,
    },

    side: {
      type: String,
      enum: sideEnum,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CloseFriends", CloseFriendsSchema);
