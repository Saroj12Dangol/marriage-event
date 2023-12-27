const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const generateToken = require("../../../utils/generateToken");

const TeamSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },

    password: {
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
      default: "admin",
    },

    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// TODO: here plane password is hashed and stored in the db, salt is for the generation of the random number
TeamSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  // TODO: hasing password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.token = await generateToken(this._id);
  next();
});

module.exports = mongoose.model("Team", TeamSchema);
