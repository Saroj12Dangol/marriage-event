const ContactModel = require("../model/ContactModel");

const EditContactService = async (contactId, body, res) => {
  try {
    const updatedContact = await ContactModel.findOneAndUpdate(
      { _id: contactId },
      { $set: body },
      { new: true }
    );

    if (!updatedContact) {
      return res.status(404).json({
        message: `${contactId} not found`,
      });
    }

    return res.status(200).json({
      data: updatedContact,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { EditContactService };
