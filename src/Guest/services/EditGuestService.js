const GuestModel = require("../model/GuestModel");

const EditGuestService = async (guestId, req, res) => {
  try {
    const updatedGuest = await GuestModel.findOneAndUpdate(
      { _id: guestId },
      { $set: req.body },
      { new: true } // This option ensures that the updated document is returned
    );

    if (!updatedGuest) {
      return res.status(404).json({
        message: `Guest with ID ${guestId} not found`,
      });
    }

    return res.status(200).json({
      data: updatedGuest,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { EditGuestService };
