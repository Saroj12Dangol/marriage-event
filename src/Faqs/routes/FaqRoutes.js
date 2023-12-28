const express = require("express");
const IsAdmin = require("../../../middlewares/AdminProtect");
const {
  CreateFaqsController,
  EditFaqsController,
  DeleteFaqsController,
  FetchFaqsController,
} = require("../controller/FaqController");

const FaqRouter = express.Router();

// TODO: post faqs router============
FaqRouter.post("/", IsAdmin, CreateFaqsController);

// TODO: get faqs router============
FaqRouter.get("/", FetchFaqsController);

// ===========

// TODO: edit faqs router============
FaqRouter.put("/:faqId", IsAdmin, EditFaqsController);

// ===========

// TODO: delete faqs router============
FaqRouter.delete("/:faqId", IsAdmin, DeleteFaqsController);

// ===========

module.exports = { FaqRouter };
