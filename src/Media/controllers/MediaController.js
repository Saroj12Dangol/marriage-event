const { DeleteImageService } = require("../services/DeleteImageService");

const DeleteImageController = async (req, res) => {
  const { imageId } = req.params;

  if (imageId) {
    DeleteImageService(imageId, res);
  } else {
    return res.status(400).json({
      message: "Image Id is required",
    });
  }
};

module.exports = { DeleteImageController };
