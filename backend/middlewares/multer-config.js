const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

exports.upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "images");
    },
    filename: (req, file, callback) => {
      const name = file.originalname.split(" ").join("_");
      callback(null, name);
    },
  }),
  // limits: { fileSize: 2 * 1024 * 1024 },
}).single("image");

exports.convertToWebP = (req, res, next) => {
  if (req.file && req.file.mimetype.startsWith("image/")) {
    const filePath = req.file.path;
    const fileName = req.file.filename.split(".")[0];
    const webpFilePath = filePath.split(".")[0] + Date.now() + ".webp";
    sharp(filePath)
      .webp({ quality: 20 })
      .toFile(webpFilePath, (err, info) => {
        if (err) {
          console.error('Error converting image to WebP:', err);
        } else {
          req.file.path = webpFilePath;
          req.file.destination = "webp-images";
          req.file.filename = fileName + ".webp";
        }
        setTimeout(() => {
          fs.unlink(filePath, unlinkErr => {
            if (unlinkErr) {
              console.error('Error deleting original image file:', unlinkErr);
            }
            next();
          });
        }, 1000);
      });
  } else {
    next();
  }
};
