const ContactModel = require("../model/ContactModel");

const FetchContactService = async (res) => {
  try {
    //TODO: get contact
    const contact = await ContactModel.find();

    return res.status(200).json({
      data: contact,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { FetchContactService };
