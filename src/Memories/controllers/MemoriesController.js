const { CreateMemoriesService } = require("../services/CreateMemoriesService");

const CreateMemoriesController = (req, res) => {
  console.log(req.files, "fdsf");
  if (!req.files.images) {
    return res.status(400).json({
      message: "Atleast one image is required",
    });
  }

  CreateMemoriesService(req, res);
};

const FetchMemoriesController = () => {};

module.exports = { CreateMemoriesController, FetchMemoriesController };
