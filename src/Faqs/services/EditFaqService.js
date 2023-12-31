const FaqModel = require("../model/FaqModel");

const EditFaqsService = async (faqId, body, res) => {
  try {
    const updatedFaq = await FaqModel.findOneAndUpdate(
      { _id: faqId },
      { $set: body },
      { new: true }
    );

    if (!updatedFaq) {
      return res.status(404).json({
        message: `${faqId} not found`,
      });
    }

    return res.status(200).json({
      data: updatedFaq,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { EditFaqsService };
