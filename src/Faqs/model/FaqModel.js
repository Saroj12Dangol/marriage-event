const mongoose = require("mongoose");

const FaqSchema = mongoose.Schema(
  {
    question: {
      type: String,
    },

    answer: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Faqs", FaqSchema);
