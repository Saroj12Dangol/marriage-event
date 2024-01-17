const multer = require("multer");

// Define file storage
const storage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, "uploads");
  // },
  filename: function (req, file, cb) {
    console.log(file, "fileeeeeeeeee");
    // toISOString() => method is used to convert the given date object's contents into a string in ISO format (ISO 8601).
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    );
  },
});

// File filter for both images and videos
function fileFilter(req, file, cb) {
  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype.startsWith("video/")
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20337697, // Set your own file size limit
  },
});

// File size formatter (copy-paste)
const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));

  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

module.exports = { upload, fileSizeFormatter };
