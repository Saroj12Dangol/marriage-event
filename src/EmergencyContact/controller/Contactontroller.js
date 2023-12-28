const { CreateContactService } = require("../services/CreateContactervice");
const { DeleteContactService } = require("../services/DeleteContactService");
const { EditContactService } = require("../services/EditContactService");
const { FetchContactService } = require("../services/FetchContactService");

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
  const { ContactId } = req.params;

  EditContactService(ContactId, req.body, res);
};

// TODO: delete Contacts
const DeleteContactsController = async (req, res) => {
  const { ContactId } = req.params;

  DeleteContactService(ContactId, res);
};

module.exports = {
  CreateContactController,
  EditContactsController,
  DeleteContactsController,
  FetchContactsController,
};
