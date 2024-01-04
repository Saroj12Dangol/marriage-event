const { fileSizeFormatter } = require("./ImageUpload");
const uuid = require("uuid").v4;

const cloudinary = require("cloudinary").v2;

const ImageUploadHandler = async (file, res) => {
  let fileDataImage = {};
  if (file) {
    console.log(file, "fileddddd");
    let uploadedFile;
    try {
      let resourceType;

      if (file.mimetype.startsWith("image")) {
        resourceType = "image";
      } else if (file.mimetype.startsWith("video")) {
        resourceType = "video";
      } else {
        throw new Error("Unsupported file type");
      }

      uploadedFile = await cloudinary.uploader.upload(file.path, {
        folder: `events/${resourceType}/`,
        resource_type: resourceType,
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
