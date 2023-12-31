// const multer = require("multer");

// //define file storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     //toISOString() =>  method is used to convert the given date object's contents into a string in ISO format (ISO 8601) i.e, in the form of (YYYY-MM-DDTHH:mm:ss. sssZ or ±YYYYYY-MM-DDTHH:mm:ss. sssZ).
//     cb(
//       null,
//       new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
//     ); // 23/10/2022
//   },
// });

// // what kind of file is saved in DB i.e image validation
// function fileFilter(req, file, cb) {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// }

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: {
//     fileSize: 20337697,
//   },
// });

// //file size formate (copy paste)
// const fileSizeFormatter = (bytes, decimal) => {
//   if (bytes === 0) {
//     return "0 Bytes";
//   }
//   const dm = decimal || 2;
//   const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
//   const index = Math.floor(Math.log(bytes) / Math.log(1000));

//   return (
//     parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
//   );
// };

// module.exports = { upload, fileSizeFormatter };

const multer = require("multer");

//define file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    //toISOString() =>  method is used to convert the given date object's contents into a string in ISO format (ISO 8601) i.e, in the form of (YYYY-MM-DDTHH:mm:ss. sssZ or ±YYYYYY-MM-DDTHH:mm:ss. sssZ).
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "_" + file.originalname
    ); // 23/10/2022
  },
});

// what kind of file is saved in DB i.e image validation
function fileFilter(req, file, cb) {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter });

//file size formate (copy paste)
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
