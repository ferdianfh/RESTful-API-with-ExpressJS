const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const uniqueSuffix = Date.now() + "-" + "zwallet";
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  }
});

const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return cb(
      new Error(
        "File extension is invalid! Make sure to change your file extension to '.png', '.jpg', or '.jpeg'."
      )
    );
  }
  cb(null, true);
};

const limits = { fileSize: 1024 * 1024 };

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: limits
});

module.exports = upload;
