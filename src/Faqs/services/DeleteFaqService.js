const FaqModel = require("../model/FaqModel");

const DeleteFaqsService = async (faqId, res) => {
  try {
    const faq = await FaqModel.findById(faqId);

    if (!faq) {
      return res.status(404).json({
        message: `${faqId} not found`,
      });
    }

    await FaqModel.deleteOne({ _id: faqId });

    return res.status(200).json({
      message: `${faqId} is deleted.`,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { DeleteFaqsService };
