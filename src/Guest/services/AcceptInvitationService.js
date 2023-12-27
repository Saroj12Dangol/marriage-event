const GuestModel = require("../model/GuestModel");

const AcceptInvitationService = async (eventId, req, res) => {
  try {
    const guest = await GuestModel.findOneAndUpdate(
      { _id: req.guest._id },
      { $set: { ...req.body, eventStatus: "accept" } },
      { new: true } // This option ensures that the updated document is returned
    );

    return res.status(200).json({
      data: guest,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { AcceptInvitationService };
