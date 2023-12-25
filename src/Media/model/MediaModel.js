const mongoose = require("mongoose");
const CoupleModel = require("../../Couple/model/CoupleModel");

const MediaSchema = mongoose.Schema(
  {
    image: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Media", MediaSchema);
