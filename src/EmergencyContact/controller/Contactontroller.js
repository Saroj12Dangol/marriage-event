const { CreateContactService } = require("../services/CreateContactervice");
const { DeleteContactService } = require("../services/DeleteContactService");
const { EditContactService } = require("../services/EditContactService");
const { FetchContactService } = require("../services/FetchContactService");
const { SingleContactService } = require("../services/SIngleContactService");

// TODO: create Contact
const CreateContactController = (req, res) => {
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["name", "phone"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  CreateContactService(req, res);
};

// TODO: get Contacts
const FetchContactsController = async (req, res) => {
  FetchContactService(res);
};

// TODO: edit Contact controller
const EditContactsController = async (req, res) => {
  const { contactId } = req.params;

  EditContactService(contactId, req.body, res);
};

// TODO: delete Contacts
const DeleteContactsController = async (req, res) => {
  const { contactId } = req.params;

  DeleteContactService(contactId, res);
};

// TODO: get single Contacts
const SingleContactsController = async (req, res) => {
  const { contactId } = req.params;

  SingleContactService(contactId, res);
};

module.exports = {
  CreateContactController,
  EditContactsController,
  DeleteContactsController,
  FetchContactsController,
  SingleContactsController,
};
