const FaqModel = require("../model/FaqModel");

const fetchFaqService = async (res) => {
  try {
    //TODO: get faq
    const faq = await FaqModel.find();

    return res.status(200).json({
      data: faq,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { fetchFaqService };
