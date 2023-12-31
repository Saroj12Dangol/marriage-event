const mongoose = require("mongoose");
const moment = require("moment");
const { statusEnum } = require("../../../constants/enums");

const EventSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },

    backgrounds: {
      type: [mongoose.Schema.ObjectId],
      ref: "Media",
      default: function () {
        return [];
      },
    },

    description: {
      type: String,
    },

    venue: {
      type: String,
    },

    startDateTime: {
      type: Date,
    },

    endDateTime: {
      type: Date,
      required: true,
    },

    guestCapacity: {
      type: Number,
    },

    // couple: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: "Couple",
    // },

    guests: {
      //complete crud
      type: [mongoose.Schema.ObjectId],
      ref: "Guest",
      default: function () {
        return [];
      },
    },

    // closeFriends: {
    //   type: [mongoose.Schema.ObjectId],
    //   ref: "CloseFriends",
    //   default: function () {
    //     return [];
    //   },
    // },

    status: {
      type: String,
      enum: statusEnum,
      default: "upcoming",
    },

    agency: {
      type: mongoose.Schema.ObjectId,
      ref: "Agency",
    },

    days: {
      //complete crud
      type: [mongoose.Schema.ObjectId],
      ref: "Days",
      default: function () {
        return [];
      },
    },

    memories: {
      //complete crud
      type: [mongoose.Schema.ObjectId],
      ref: "Memories",
      default: function () {
        return [];
      },
    },

    // loveStory: {
    //   //complete crud
    //   type: [mongoose.Schema.ObjectId],
    //   ref: "LoveStory",
    //   default: function () {
    //     return [];
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to update status based on startDateTime and endDateTime
EventSchema.pre("save", function (next) {
  const now = moment();

  // Update status for ongoing events
  if (this.startDateTime && moment(this.startDateTime).isSameOrBefore(now)) {
    this.status = "ongoing";
  }

  // Update status for completed events
  if (this.endDateTime && moment(this.endDateTime).isSameOrBefore(now)) {
    this.status = "completed";
  }

  next(); // Continue with the save operation
});

// // Function to update status based on startDateTime and endDateTime
// function updateStatusEvent() {
//   const now = moment();
//   mongoose
//     .model("Event")
//     .find()
//     .then((events) => {
//       events.forEach((event) => {
//         if (
//           event.startDateTime &&
//           moment(event.startDateTime).isSameOrBefore(now)
//         ) {
//           event.status = "ongoing";
//         }
//         if (
//           event.endDateTime &&
//           moment(event.endDateTime).isSameOrBefore(now)
//         ) {
//           event.status = "completed";
//         }
//         event.save().catch((err) => {
//           console.error(`Error updating status for event ${event._id}:`, err);
//         });
//       });
//     });
// }

const EventModel = mongoose.model("Event", EventSchema);

module.exports = {
  EventModel,
  // updateStatusEvent,
};
