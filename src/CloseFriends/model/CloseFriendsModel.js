const mongoose = require("mongoose");

// const sideEnum = ["bride", "groom"];
const CloseFriendsSchema = mongoose.Schema(
  {
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Media" },

    name: {
      type: String,
    },

    relation: {
      type: String,
    },

    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("CloseFriends", CloseFriendsSchema);
