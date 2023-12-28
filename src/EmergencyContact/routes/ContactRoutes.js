const express = require("express");
const IsAdmin = require("../../../middlewares/AdminProtect");
const {
  CreateContactController,
  FetchContactsController,
  EditContactsController,
  DeleteContactsController,
} = require("../controller/Contactontroller");

const ContactRouter = express.Router();

// TODO: post faqs router============
ContactRouter.post("/", IsAdmin, CreateContactController);

// TODO: get faqs router============
ContactRouter.get("/", FetchContactsController);

// ===========

// TODO: edit faqs router============
ContactRouter.put("/:faqId", IsAdmin, EditContactsController);

// ===========

// TODO: delete faqs router============
ContactRouter.delete("/:faqId", IsAdmin, DeleteContactsController);

// ===========

module.exports = { ContactRouter };
