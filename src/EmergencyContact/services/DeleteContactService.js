const ContactModel = require("../model/ContactModel");

const DeleteContactService = async (contactId, res) => {
  try {
    const contact = await ContactModel.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: `${contactId} not found`,
      });
    }

    await ContactModel.deleteOne({ _id: contactId });

    return res.status(200).json({
      message: `${contactId} is deleted.`,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { DeleteContactService };
