const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");

exports.upload = multer({
  storage: multer.memoryStorage()
}).single("image");

exports.convertToWebP = async (req, res, next) => {
  if (req.file) {
    const file = req.file.buffer;
    const fileName = req.file.originalname.split(".")[0];
    const webpFilePath = "Images/" + fileName + Date.now() + ".webp";
    const imageWebp = await sharp(file).webp({ quality: 20 }).toBuffer();

    fs.writeFileSync(webpFilePath, imageWebp);
    req.file.path = webpFilePath;
    next();
  } else {
    next();
  }
};
