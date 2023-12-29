const FaqModel = require("../model/FaqModel");

const SingleFaqsService = async (faqId, res) => {
  try {
    const faq = await FaqModel.findById(faqId);

    if (!faq) {
      return res.status(404).json({
        message: `${faqId} not found`,
      });
    }
    return res.status(200).json({
      data: faq,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { SingleFaqsService };
