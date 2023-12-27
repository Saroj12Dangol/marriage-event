const CreateTravelDetailsController = (req, res) => {
  const { eventId } = req.params;

  // TODO: data validation ===========
  // Check if all required fields are present
  const requiredFields = ["title", "description", "location", "dateTime"];

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

  //   CreateDaysService(req, eventId, file, res);
};

module.exports = {
  CreateTravelDetailsController,
};
