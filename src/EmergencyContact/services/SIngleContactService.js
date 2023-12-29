const ContactModel = require("../model/ContactModel");

const SingleContactService = async (contactId, res) => {
  try {
    const contact = await ContactModel.findById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: `${contactId} not found`,
      });
    }

    return res.status(200).json({
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { SingleContactService };
