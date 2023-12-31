const FaqModel = require("../model/FaqModel");

const CreateFaqsService = async (req, res) => {
  try {
    const faq = new FaqModel(req.body);

    await faq.save();

    return res.status(200).json({
      data: faq,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { CreateFaqsService };
