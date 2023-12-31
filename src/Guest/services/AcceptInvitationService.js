const { eventStatusObj } = require("../../../constants/statuses");
const GuestModel = require("../model/GuestModel");

const AcceptInvitationService = async (req, res) => {
  try {
    const guest = await GuestModel.findOneAndUpdate(
      { _id: req.guest._id },
      { $set: { ...req.body, eventStatus: eventStatusObj.accept } },
      { new: true } // This option ensures that the updated document is returned
    );

    return res.status(200).json({
      data: guest,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { AcceptInvitationService };
