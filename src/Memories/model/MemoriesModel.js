const mongoose = require("mongoose");

const MemoriesSchema = mongoose.Schema(
  {
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Media" }],

    guest: {
      type: mongoose.Schema.ObjectId,
      ref: "Guest",
    },

    event: {
      type: mongoose.Schema.ObjectId,
      ref: "Event",
    },

    day: {
      type: mongoose.Schema.ObjectId,
      ref: "Days",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Memories", MemoriesSchema);
