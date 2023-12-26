const { fileSizeFormatter } = require("./ImageUpload");
const uuid = require("uuid").v4;

const cloudinary = require("cloudinary").v2;

const ImageUploadHandler = async (file, res) => {
  let fileDataImage = {};
  if (file) {
    let uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(file.path, {
        folder: "events/",
        resource_type: "image",
      });

      fileDataImage = {
        fileName: file.originalname,
        fileUrl: uploadedFile.secure_url,
        fileType: file.mimetype,
        fileSize: fileSizeFormatter(file.size, 2),
      };
    } catch (error) {
      throw new Error(error.message);
    }

    return fileDataImage;
  } else {
    throw new Error("Internal server error");
  }
};

module.exports = { ImageUploadHandler };
