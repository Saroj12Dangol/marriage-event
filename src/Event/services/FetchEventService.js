const { EventModel } = require("../model/EventModel");

const FetchEventService = async (res, populateObj, page, limit, skip) => {
  // TODO: post event in database


  try {
    const event = await EventModel.find({})
      .skip(skip)
      .limit(limit)
      .populate(populateObj);

    const total = await EventModel.countDocuments();

    const meta = {
      total, // Corrected method name
      page,
      limit,
      pageSize: Math.ceil(total / limit),
    };

    return res.status(200).json({
      data: event,
      meta: meta,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { FetchEventService };
