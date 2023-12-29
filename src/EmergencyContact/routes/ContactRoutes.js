const express = require("express");
const IsAdmin = require("../../../middlewares/AdminProtect");
const {
  CreateContactController,
  FetchContactsController,
  EditContactsController,
  DeleteContactsController,
  SingleContactsController,
} = require("../controller/Contactontroller");

const ContactRouter = express.Router();

// TODO: post contact router============
ContactRouter.post("/", IsAdmin, CreateContactController);

// TODO: get contact router============
ContactRouter.get("/", FetchContactsController);

// ===========

// TODO: edit contact router============
ContactRouter.put("/:contactId", IsAdmin, EditContactsController);

// ===========

// TODO: delete contact router============
ContactRouter.delete("/:contactId", IsAdmin, DeleteContactsController);

// ===========

// TODO: single contact router============
ContactRouter.get("/detail/:contactId", IsAdmin, SingleContactsController);

// ===========

module.exports = { ContactRouter };
