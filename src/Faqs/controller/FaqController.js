const { CreateFaqsService } = require("../services/CreateFaqService");
const { DeleteFaqsService } = require("../services/DeleteFaqService");
const { EditFaqsService } = require("../services/EditFaqService");
const { fetchFaqService } = require("../services/FetchFaqService");

// TODO: create faq
const CreateFaqsController = (req, res) => {
  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["question", "answer"];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  CreateFaqsService(req, res);
};

// TODO: get faqs
const FetchFaqsController = async (req, res) => {
  fetchFaqService(res);
};

// TODO: edit faq controller
const EditFaqsController = async (req, res) => {
  const { faqId } = req.params;

  EditFaqsService(faqId, req.body, res);
};

// TODO: delete faqs
const DeleteFaqsController = async (req, res) => {
  const { faqId } = req.params;

  DeleteFaqsService(faqId, res);
};

module.exports = {
  CreateFaqsController,
  EditFaqsController,
  DeleteFaqsController,
  FetchFaqsController,
};
