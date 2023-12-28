const {
  CreateTravelDetailService,
} = require("../services/CreateTravelDetailService");

const CreateTravelDetailsController = (req, res) => {
  const { eventId } = req.params;

  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = [
    "airline",
    "flightNumber",
    "arrivalDateTime",
    "departureDateTime",
    "arrivalPlace",
    "departurePlace",
    "email",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: `Missing required fields: ${missingFields.join(", ")}`,
    });
  }

  //   TODO: work

  if (!req.file) {
    return res.status(400).json({
      message: `Image is required`,
    });
  }

  const { file } = req;
  if (!file) {
    return res.status(400).json({
      message: "Image is required",
    });
  }

  CreateTravelDetailService(req, eventId, file, res);
};

module.exports = {
  CreateTravelDetailsController,
};
