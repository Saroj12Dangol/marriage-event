const ContactModel = require("../model/ContactModel");

const CreateContactService = async (req, res) => {
  try {
    const contact = new ContactModel(req.body);

    await contact.save();

    return res.status(200).json({
      data: contact,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { CreateContactService };
