const NotificationModel = require("../model/NotificationModel");

const FetchNotificationService = async (skip, limit, page, toQuery, res) => {
  try {
    const notification = await NotificationModel.find(toQuery)
      .skip(skip)
      .limit(limit);

    const total = await NotificationModel.countDocuments();

    const meta = {
      total, // Corrected method name
      page,
      limit,
      pageSize: Math.ceil(total / limit),
    };

    return res.status(200).json({
      data: notification,
      meta,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { FetchNotificationService };
