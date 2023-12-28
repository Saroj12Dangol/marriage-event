const FaqModel = require("../model/FaqModel");

const CreateFaqsService = async (req, res) => {
  console.log(req.body);
  try {
    const faq = new FaqModel(req.body);

    await faq.save();

    return res.status(200).json({
      data: faq,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { CreateFaqsService };
